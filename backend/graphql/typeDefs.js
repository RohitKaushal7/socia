const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    users(input: UserInput): [User]
    posts(input: PostInput): [Post]
    comments(input: CommentInput): [Comment]
    likes(input: LikeInput): [Like]
    follows(input: FollowInput): [Follow]
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(input: PostInput): Post
    deletePost(input: PostInput): Int

    createComment(input: CommentInput): Comment
    updateComment(input: CommentInput): Comment
    deleteComment(input: CommentInput): Int

    createLike(input: LikeInput): Like
    deleteLike(input: LikeInput): Int

    createFollow(input: FollowInput): Follow
    deleteFollow(input: FollowInput): Int
  }

  type User {
    id: Int
    email: String
    password: String
    name: String
    username: String
    role: Role
    privacy: Privacy
    posts: [Post]
    followers: [Follow]
    following: [Follow]
    likes: [Like]
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: Int
    text: String
    published: Boolean
    privacy: Privacy
    likes: [Like]
    comments: [Comment]
    user: User
    userId: Int
    createdAt: String
    updatedAt: String
  }

  type Follow {
    id: Int
    userId: Int
    user: User
    followedById: Int
    followedByUser: User
  }

  type Like {
    id: Int
    postId: Int
    userId: Int
    post: Post
    user: User
  }

  type Comment {
    id: Int
    postId: Int
    userId: Int
    text: String
    post: Post
    user: User
  }

  input PostInput {
    id: Int
    text: String
    published: Boolean
    privacy: Privacy
    isFollowing: Boolean
  }
  input UserInput {
    id: Int
    username: String
    email: String
    name: String
    privacy: Privacy
    profilePictureUrl: String
  }
  input CommentInput {
    id: Int
    postId: Int
    text: String
  }
  input LikeInput {
    postId: Int
  }
  input FollowInput {
    userId: Int
  }

  enum Privacy {
    PUBLIC
    PRIVATE
  }
  enum Role {
    USER
    ADMIN
  }
`;
