import graph from "./graph";
import { gql } from "graphql-request";

export const getPosts = async ({ userId, isFollowing }, AUTH_TOKEN) => {
  const QUERY = gql`
    query getPosts($input: PostInput) {
      posts(input: $input) {
        id
        text
        userId
        user {
          id
          name
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      userId: userId,
    },
  });
};

export const getPost = async ({ postId }, AUTH_TOKEN) => {
  const QUERY = gql`
    query getPosts($input: PostInput) {
      posts(input: $input) {
        id
        text
        userId
        privacy
        published
        comments {
          id
          text
        }
        user {
          id
          name
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      id: parseInt(postId),
    },
  });
};

export const createPost = (AUTH_TOKEN) => async ({ text }) => {
  const QUERY = gql`
    mutation createPost($input: PostInput) {
      createPost(input: $input) {
        id
        text
        userId
        privacy
        published
        comments {
          id
          text
        }
        user {
          id
          name
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      text: text,
    },
  });
};

export const updatePost = (AUTH_TOKEN) => async ({ id, text }) => {
  const QUERY = gql`
    mutation updatePost($input: PostInput) {
      updatePost(input: $input) {
        id
        text
        userId
        privacy
        published
        comments {
          id
          text
        }
        user {
          id
          name
          username
          profilePictureUrl
        }
        createdAt
      }
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      id: id,
      text: text,
    },
  });
};

export const deletePost = (AUTH_TOKEN) => async ({ id }) => {
  const QUERY = gql`
    mutation deletePost($input: PostInput) {
      deletePost(input: $input)
    }
  `;

  return graph(QUERY, AUTH_TOKEN, {
    input: {
      id: parseInt(id),
    },
  });
};
