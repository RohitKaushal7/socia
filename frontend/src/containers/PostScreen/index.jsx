import React from "react";
import Post from "../../components/molecules/Cards/Post";
import { useAppContext } from "../../context/AppContext";
import { useDeletePost, useGetPost } from "../../hooks/api/posts";

export default function PostScreen({ history, match }) {
  const { currentUser } = useAppContext();

  const postsQuery = useGetPost({ postId: match.params.id });
  const deletePostMutation = useDeletePost();

  const post = postsQuery.data?.posts[0];

  const handleDelete = () => {
    deletePostMutation.mutate(
      { id: match.params.id },
      {
        onSuccess: () => {
          setTimeout(() => {
            deletePostMutation.reset();
            history.push("/profile");
          }, 1000);
        },
      }
    );
  };

  return (
    <div className="bg-gray-800   text-white">
      <div className="container min-h-screen m-auto max-w-6xl p-16">
        <h1 className="text-2xl mb-8">Post</h1>
        {post && (
          <div className="py-4">
            <Post post={post} />

            {post.userId == currentUser.id && (
              <div className="py-4">
                <button className="text-red-400" onClick={handleDelete}>
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
        {postsQuery.data && !post ? (
          <div className="text-red-400">Post Not Found</div>
        ) : null}
        {deletePostMutation.isSuccess && (
          <div className="text-green-400">Deleted Successfully !</div>
        )}
        {deletePostMutation.isError && (
          <div className="text-red-400">Opps Something went wrong.</div>
        )}
      </div>
    </div>
  );
}
