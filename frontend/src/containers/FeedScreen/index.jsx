import React from "react";
import { Link } from "react-router-dom";
import Post from "../../components/molecules/Cards/Post";
import { useAppContext } from "../../context/AppContext";
import { useGetPosts } from "../../hooks/api/posts";

export default function FeedScreen({}) {
  const { currentUser } = useAppContext();

  const postsQuery = useGetPosts({});

  return (
    <div className="bg-gray-800   text-white">
      <div className="container min-h-screen m-auto max-w-6xl p-16">
        <header className="flex justify-between">
          <h1 className="text-3xl">Socia</h1>
          <div className="user flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/create">
                <button title="create post" className="font-bold text-2xl">
                  +
                </button>
              </Link>
              <Link to="/profile">
                <div className="info ml-5 flex items-center">
                  <div className="name px-2">{currentUser.name}</div>
                  <div className="pic w-8 h-8 overflow-hidden rounded-full bg-gray-500">
                    <img
                      src={currentUser.profilePictureUrl}
                      alt=""
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>
        <main className="py-8 max-w-3xl m-auto">
          {postsQuery.data?.pages
            ?.map((page) => page.posts)
            .flat()
            .map((post) => (
              <Post post={post} key={post.id} linked />
            ))}
        </main>
      </div>
    </div>
  );
}
