import MyPostCard from "./MyPostCard";

function MyPostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <MyPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default MyPostList;