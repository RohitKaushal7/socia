import React, { useEffect, useState } from "react";
import FollowButton from "../../components/molecules/buttons/FollowButton";
import LogoutButton from "../../components/molecules/buttons/LogoutButton";
import EditProfile from "../../components/organisms/Forms/EditProfile/EditProfile";
import { useAppContext } from "../../context/AppContext";
import { useGetPosts } from "../../hooks/api/posts";
import { useGetUser } from "../../hooks/api/users";

export default function Profile() {
  const { currentUser } = useAppContext();

  const userQuery = useGetUser({ userId: currentUser.id });
  const user = userQuery.data?.users[0];
  const postsQuery = useGetPosts({ userId: currentUser.id });

  // STATES
  const [editProfile, setEditProfile] = useState(false);

  // EFFECTS
  // FUNCTIONS
  // PRERENDER
  // RENDER

  return user ? (
    <div className="bg-gray-800   text-white">
      <div className="container min-h-screen m-auto max-w-6xl">
        <header className="p-4 py-16 flex justify-between items-center">
          <div className="user flex items-center justify-between">
            <div className="info ml-5">
              <div className="name"></div>
              <div className="email text-gray-400">{user.email}</div>
            </div>
          </div>
          <div className="actions">
            <button className="px-6" onClick={() => setEditProfile((e) => !e)}>
              {editProfile ? "Cancel" : "Edit Profile"}
            </button>
            <LogoutButton className="px-6 text-red-400" />
          </div>
        </header>
        {editProfile ? (
          <EditProfile onCancel={() => setEditProfile(false)} />
        ) : (
          <div>
            <main className="flex flex-col justify-center items-center my-5">
              <div className="pic w-36 h-36 overflow-hidden rounded-full bg-gray-500">
                <img
                  src={user.profilePictureUrl}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div className="info py-4 flex flex-col items-center">
                <div className="name text-2xl">{user.name}</div>
                {/* <div className="username text-gray-200">@rohitkaushal</div> */}
                <div className="actions py-4">
                  <FollowButton className="text-blue-400" />
                </div>
                <div className="bio max-w-4xl py-4 text-center">{user.bio}</div>
              </div>
            </main>
            <div className="py-4 w-full max-w-4xl m-auto">
              <div className="post-actions my-3">
                <button className="text-yellow-300">Create New Post</button>
              </div>
              <section className="flex flex-col justify-center items-center ">
                {postsQuery.data?.pages
                  .map((page) => page.posts)
                  .flat()
                  .map((post) => (
                    <div className="post p-4 my-2 bg-gray-700 rounded min-w-full">
                      {post.text}
                    </div>
                  ))}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
