import graph from "./graph";
import { gql } from "graphql-request";

export const getPosts = async ({ userId, isFollowing }, AUTH_TOKEN) => {
  const QUERY = gql`
    query getPosts($input: PostInput) {
      posts(input: $input) {
        id
        text
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      userId: userId,
    },
  });
};
