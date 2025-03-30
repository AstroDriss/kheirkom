"use server";

import { createClient } from "@/utils/supabase/server";

export const post = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  if (!content.trim()) return { error: "Post content is required" };

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.user_metadata.role !== "association")
    return { error: "only associations can post" };

  let uploadedImageUrl = null;
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
    console.log(data);
    uploadedImageUrl = data.secure_url;
  }

  console.log({ uploadedImageUrl });

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

    console.log(imageError);

    if (imageError) {
      return { error: "Error saving image" };
    }
  }

  return { success: true };
};

export const fetchPosts = async ({
  pageParam,
}: {
  pageParam: {
    created_at: string | null;
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
    post_analytics (likes_count),
    user:users(first_name, last_name, profile_image),
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
    post_analytics!inner (likes_count),
    user:users(first_name, last_name, profile_image)`
      )
      .order("created_at", { ascending: false })
      .limit(limit);
  }

  if (pageParam.created_at) {
    query = query.gt("created_at", pageParam.created_at);
  }

  const { data, error } = await query;

  if (error) throw error;
  return {
    data,
    nextPage: {
      created_at: data.length > 0 ? data[data.length - 1].created_at : null,
      user_id: pageParam.user_id,
    },
  };
};

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
