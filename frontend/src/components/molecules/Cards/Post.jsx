import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime);

export default function Post({ post, linked }) {
  let MyLink = Link;

  if (!linked) {
    MyLink = ({ children }) => <div>{children}</div>;
  }

  return (
    <div className="post p-4 my-2 bg-gray-700 rounded min-w-full">
      <MyLink to={`/post/${post.id}`}>
        <div>
          <header className="pb-2 flex items-center">
            <div className="pic w-8 h-8 overflow-hidden rounded-full bg-gray-500">
              <img
                src={post.user?.profilePictureUrl}
                alt=""
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col px-2 ">
              <div className="text-xs text-gray-400">{post.user?.name}</div>
              <div
                className="text-xs text-gray-500"
                style={{ fontSize: "0.6em" }}
              >
                {dayjs(parseInt(post.createdAt)).format("DD MMM YYYY")}
              </div>
            </div>
          </header>
          <p className="py-2">{post.text}</p>
        </div>
      </MyLink>
    </div>
  );
}
