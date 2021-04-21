import React from "react";
import CreatePost from "../../components/organisms/Forms/CreatePost/CreatePost";

export default function CreatePostScreen() {
  return (
    <div className="bg-gray-800   text-white">
      <div className="container min-h-screen m-auto max-w-6xl p-16">
        <h1 className="text-2xl mb-8">Create New Post</h1>
        <CreatePost />
      </div>
    </div>
  );
}
