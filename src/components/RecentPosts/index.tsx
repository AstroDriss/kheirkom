import { fetchPosts } from "@/actions/post";
import PostCard from "../PostCard";

const index = async () => {
  const { data } = await fetchPosts({
    pageParam: { created_at: null, user_id: null },
  });

  return (
    <section className="section-space">
      <h2 className="text-3xl font-semibold mb-2">Recent Posts</h2>

      {data.length === 0 ? (
        <p>No Posts yet</p>
      ) : (
        <ul className="gap-3 grid md:grid-cols-3">
          {data.slice(0, 3).map((post) => (
            <li key={post.id}>
              <PostCard post={post} user_id={null} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default index;
