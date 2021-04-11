const db = require("../prisma/db");

// QUERIES
exports.getComments = async (root, args, context) => {
  return await db.comment.findMany({
    where: {
      ...args.input,
    },
  });
};

// MUTATIONS

exports.createComment = async (root, args, context) => {
  try {
    let post = await db.post.findUnique({ where: { id: args.input.postId } });
    if (!post) {
      throw new Error(`NOT_EXISTS`);
    }

    let comment = await db.comment.create({
      data: { ...args.input, userId: context.user.id, postId: post.id },
    });
    return comment;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateComment = async (root, args, context) => {
  try {
    let comment = await db.comment.findUnique({ where: { id: args.input.id } });
    if (!comment) {
      throw new Error(`NOT_EXISTS`);
    }
    if (comment.userId != context.user.id) {
      throw new Error(`UNAUTHORIZED`);
    }

    comment = await db.comment.update({
      where: { id: args.input.id },
      data: { ...args.input },
    });
    return comment;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteComment = async (root, args, context) => {
  try {
    let comment = await db.comment.findUnique({ where: { id: args.input.id } });
    if (!comment) {
      throw new Error(`NOT_EXISTS`);
    }
    if (comment.userId != context.user.id) {
      throw new Error(`UNAUTHORIZED`);
    }

    let { count } = await db.comment.deleteMany({
      where: { ...args.input },
    });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};
