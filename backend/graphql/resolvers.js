const db = require("../prisma/db");
const authenticated = require("../middleware/authenticated");
const users = require("../controllers/users");
const posts = require("../controllers/posts");
const comments = require("../controllers/comments");
const likes = require("../controllers/likes");
const follows = require("../controllers/follows");

module.exports = {
  Query: {
    users: authenticated(users.getUsers),
    posts: authenticated(posts.getPosts),
    comments: authenticated(comments.getComments),
    likes: authenticated(likes.getLikes),
    follows: authenticated(follows.getFollows),
  },
  Mutation: {
    updateUser: authenticated(users.updateUser),
    deleteUser: authenticated(users.deleteUser),

    createPost: authenticated(posts.createPost),
    updatePost: authenticated(posts.updatePost),
    deletePost: authenticated(posts.deletePost),

    createComment: authenticated(comments.createComment),
    updateComment: authenticated(comments.updateComment),
    deleteComment: authenticated(comments.deleteComment),

    createLike: authenticated(likes.createLike),
    deleteLike: authenticated(likes.deleteLike),

    createFollow: authenticated(follows.createFollow),
    deleteFollow: authenticated(follows.deleteFollow),
  },
};
