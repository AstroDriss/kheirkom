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
