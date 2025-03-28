"use client";

import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";
import { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState<Pick<Tables<"posts">, "id" | "content">[]>(
    [{ id: 1, content: "filler" }]
  );

  useEffect(() => {
    async function getPosts() {
      const supabase = createClient();

      const { data: posts, error } = await supabase
        .from("posts")
        .select("id,content");

      if (error) alert(error.message);
      else setPosts(posts);
    }
    // getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <p>{post.content}</p>
      ))}
    </div>
  );
};

export default Feed;
