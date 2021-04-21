import graph from "./graph";
import { gql } from "graphql-request";

export const getUser = async ({ userId, username }, AUTH_TOKEN) => {
  const QUERY = gql`
    query getUsers($input: UserInput) {
      users(input: $input) {
        id
        name
        username
        bio
        email
        profilePictureUrl
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      id: userId,
    },
  });
};

export const updateUser = async ({ userId, data }, AUTH_TOKEN) => {
  const QUERY = gql`
    mutation updateUser($input: UserInput) {
      updateUser(input: $input) {
        id
        name
        username
        bio
        email
        profilePictureUrl
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      ...data,
      id: userId,
    },
  });
};
