const db = require("../prisma/db");

const { parseResolveInfo } = require("graphql-parse-resolve-info");

// QUERIES
exports.getPosts = async (root, args, context, info) => {
  let resolveInfo = parseResolveInfo(info).fieldsByTypeName;
  let include = {};
  if (resolveInfo.Post.user) include.user = {};
  if (resolveInfo.Post.comments) include.comments = {};
  if (resolveInfo.Post.likes) include.likes = {};

  include = Object.keys(include).length ? include : undefined;

  let where = {};
  where.id = args.input.id;
  where.userId = args.input.userId;
  if (args.input.isFollowing) {
    let follwingList = await db.follow.findMany({
      where: { followedById: context.user.id },
    });

    if (follwingList) {
      follwingList = follwingList.map((f) => f.userId);
      where.userId = {
        in: follwingList,
      };
    }
  }

  return await db.post.findMany({
    where,
    include,
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
};

// MUTATIONS

exports.createPost = async (root, args, context) => {
  try {
    let post = await db.post.create({
      data: { ...args.input, userId: context.user.id },
    });
    return post;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updatePost = async (root, args, context) => {
  try {
    let post = await db.post.findUnique({ where: { id: args.input.id } });
    if (!post) {
      throw new Error(`NOT_EXISTS`);
    }
    if (post.userId != context.user.id) {
      throw new Error(`UNAUTHORIZED`);
    }

    post = await db.post.update({
      where: { id: args.input.id },
      data: {
        text: args.input.text,
        published: args.input.published,
        privacy: args.input.privacy,
      },
    });
    return post;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deletePost = async (root, args, context) => {
  try {
    let post = await db.post.findUnique({ where: { id: args.input.id } });
    if (!post) {
      throw new Error(`NOT_EXISTS`);
    }
    if (post.userId != context.user.id) {
      throw new Error(`UNAUTHORIZED`);
    }

    let { count } = await db.post.deleteMany({
      where: { ...args.input },
    });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};
