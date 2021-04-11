const db = require("../prisma/db");

// QUERIES
exports.getFollows = async (root, args, context) => {
  return await db.follow.findMany({
    where: {
      ...args.input,
    },
  });
};

// MUTATIONS

exports.createFollow = async (root, args, context) => {
  try {
    let user = await db.user.findUnique({ where: { id: args.input.userId } });
    if (!user) {
      throw new Error(`NOT_EXISTS`);
    }
    let existingFollow = await db.follow.findFirst({
      where: { userId: user.id, followedById: context.user.id },
    });
    if (existingFollow) {
      throw new Error("ALREADY_EXISTS");
    }

    let follow = await db.follow.create({
      data: { ...args.input, userId: user.id, followedById: context.user.id },
    });
    return follow;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteFollow = async (root, args, context) => {
  try {
    if (!args.input.userId) {
      throw new Error("BAD_REQUEST - userId not provided");
    }

    let follow = await db.follow.findFirst({
      where: {
        userId: args.input.userId,
        followedById: context.user.id,
      },
    });
    if (!follow) {
      throw new Error(`NOT_EXISTS`);
    }

    const { count } = await db.follow.deleteMany({
      where: { userId: args.input.userId, followedById: context.user.id },
    });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};
