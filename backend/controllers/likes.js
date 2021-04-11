const db = require("../prisma/db");

// QUERIES
exports.getLikes = async (root, args, context) => {
  return await db.like.findMany({
    where: {
      ...args.input,
    },
  });
};

// MUTATIONS

exports.createLike = async (root, args, context) => {
  try {
    let post = await db.post.findUnique({ where: { id: args.input.postId } });
    if (!post) {
      throw new Error(`NOT_EXISTS`);
    }
    let existingLike = await db.like.findFirst({
      where: { userId: context.user.id, postId: post.postId },
    });
    if (existingLike) {
      throw new Error("ALREADY_EXISTS");
    }

    let like = await db.like.create({
      data: { userId: context.user.id, postId: post.id },
    });
    return like;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteLike = async (root, args, context) => {
  try {
    if (!args.input.postId) {
      throw new Error("BAD_REQUEST - postId not provided");
    }

    let like = await db.like.findFirst({
      where: { userId: context.user.id, postId: args.input.postId },
    });
    if (!like) {
      throw new Error(`NOT_EXISTS`);
    }

    let { count } = await db.like.deleteMany({
      where: { userId: context.user.id, postId: args.input.postId },
    });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};
