import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset")) || 0;
  const limit = Number(searchParams.get("limit")) || 10;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, content, created_at, images (images_url), likes:likes(count)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit);

  if (error) throw error;

  return Response.json(data);
}
