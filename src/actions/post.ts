"use server";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../database.types";
import { revalidatePath } from "next/cache";

export const post = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  if (!content.trim()) return { error: "Post content is required" };

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Log in to post" };

  let uploadedImageUrl = null;
  if (imageFile && imageFile.size > 5 * 1024 * 1024)
    return { error: "Image size exceeds 5MB" };
  if (imageFile) {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", imageFile);
    cloudinaryFormData.append("upload_preset", "kheirkom_post");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    const data = await res.json();
    uploadedImageUrl = data.secure_url;
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert([{ content, user_id: user.id }])
    .select("id")
    .single();

  if (postError) {
    return { error: "Error creating post" };
  }

  if (uploadedImageUrl) {
    const { error: imageError } = await supabase
      .from("images")
      .insert([{ post_id: postData.id, images_url: uploadedImageUrl }]);

    if (imageError) {
      return { error: "Error saving image" };
    }
  }

  return { success: true };
};

export const fetchPost = async (post_id: number) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let user_id = null;
  if (user) user_id = user.id;

  let query;

  if (user_id !== null) {
    query = supabase
      .from("posts")
      .select(
        `
    id, 
    content, 
    created_at, 
    images (images_url), 
    post_analytics (likes_count, comments_count),
    user:users(id, first_name, last_name, profile_image, is_verified),
    user_liked:likes(user_id)
  `
      )
      .eq("likes.user_id", user_id)
      .eq("id", post_id)
      .single();
  } else {
    query = supabase
      .from("posts")
      .select(
        `id, content, created_at,
    images (images_url),
    post_analytics!inner (likes_count, comments_count),
    user:users(id, first_name, last_name, profile_image, is_verified)`
      )
      .eq("id", post_id)
      .single();
  }

  const { data: post, error } = await query;

  if (error) return { error };

  return { post, user_id };
};

export type PostWithDetails = NonNullable<
  Awaited<ReturnType<typeof fetchPost>>["post"]
>;

export const fetchPosts = async ({
  pageParam,
}: {
  pageParam: {
    created_at: string | null;
    id: number | null;
    user_id: string | null;
  };
}) => {
  const supabase = await createClient();
  const limit = 10;

  let query;

  if (pageParam.user_id !== null) {
    query = supabase
      .from("posts")
      .select(
        `
    id, 
    content, 
    created_at, 
    images (images_url), 
    post_analytics (likes_count, comments_count),
    user:users(id, first_name, last_name, profile_image, is_verified),
    user_liked:likes(user_id)
  `
      )
      .eq("likes.user_id", pageParam.user_id)
      .order("created_at", { ascending: false })
      .limit(limit);
  } else {
    query = supabase
      .from("posts")
      .select(
        `id, content, created_at,
    images (images_url),
    post_analytics!inner (likes_count, comments_count),
    user:users(id, first_name, last_name, profile_image, is_verified)`
      )
      .order("created_at", { ascending: false })
      .limit(limit);
  }

  if (pageParam.created_at && pageParam.id) {
    query = query.or(
      `created_at.gt.${pageParam.created_at},and(created_at.eq.${pageParam.created_at},id.gt.${pageParam.id})`
    );
  }

  const { data, error } = await query;

  if (error) throw error;
  return {
    data,
    nextPage: {
      created_at: data.length > 0 ? data[data.length - 1].created_at : null,
      id: data.length > 0 ? data[data.length - 1].id : null,
      user_id: pageParam.user_id,
    },
  };
};

type UserDetails = {
  id: string;
  first_name: string;
  last_name: string | null;
  profile_image: string | null;
};

export type CommentWithUser = Tables<"comments"> & {
  user: UserDetails;
};
export type CommentWithReplies = CommentWithUser & {
  replies: CommentWithReplies[];
};

function transformCommentsToNestedStructure(
  comments: CommentWithUser[]
): CommentWithReplies[] {
  // Create a mapping of comments by ID for quick access
  const commentMap: Record<number, CommentWithReplies> = {};

  const topLevelComments: CommentWithReplies[] = [];

  comments.forEach((comment) => {
    const commentWithUser: CommentWithReplies = {
      ...comment,
      replies: [],
    };

    commentMap[comment.id] = commentWithUser;
  });

  comments.forEach((comment) => {
    const transformedComment = commentMap[comment.id];

    if (comment.parent_id === null) {
      topLevelComments.push(transformedComment);
    } else {
      const parentComment = commentMap[comment.parent_id];
      if (parentComment) {
        parentComment.replies.push(transformedComment);
      } else {
        console.warn(
          `Parent comment ${comment.parent_id} not found for comment ${comment.id}`
        );
        topLevelComments.push(transformedComment);
      }
    }
  });

  return topLevelComments;
}

export const toggleLike = async (postId: number, userId: string) => {
  const supabase = await createClient();

  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .single();

  if (existingLike) {
    await supabase.from("likes").delete().eq("id", existingLike.id);
    return { liked: false };
  } else {
    await supabase.from("likes").insert({ user_id: userId, post_id: postId });
    return { liked: true };
  }
};

export const fetchComments = async (post_id: number) => {
  const supabase = await createClient();

  const { data: comments, error } = await supabase
    .from("comments")
    .select("*, user:users(id,first_name, last_name, profile_image)")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });

  if (error) return { error: error.message };

  return { comments: transformCommentsToNestedStructure(comments) };
};

export const addComment = async (
  post_id: number,
  user_id: string,
  content: string,
  parent_id: null | number = null
) => {
  if (!post_id || !user_id || !content)
    return { error: "missing required properties" };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id, user_id, content, parent_id }])
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath(`/post/${post_id}`);
  return { id: data.id };
};
