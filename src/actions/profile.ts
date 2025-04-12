"use server";

import { createClient } from "@/utils/supabase/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadUserProfile(data: FormData) {
  const file = data.get("file") as File | null;
  const user_id = data.get("user_id") as string | null;

  if (!file || !user_id) {
    throw new Error("Missing file or user_id");
  }
  const supabase = await createClient();

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Create a consistent public_id per user to override each time
  const publicId = `profiles/${user_id}`;

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: publicId,
          folder: "profiles",
          overwrite: true,
          transformation: [
            { width: 100, height: 100, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      )
      .end(buffer);
  });

  // Save image URL to Supabase
  const { error } = await supabase
    .from("users")
    .update({ profile_image: result.secure_url })
    .eq("id", user_id);

  if (error) throw new Error(error.message);

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
}
