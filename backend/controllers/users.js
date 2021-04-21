const db = require("../prisma/db");
const { parseResolveInfo } = require("graphql-parse-resolve-info");

exports.getUsers = async (root, args, context, info) => {
  let resolveInfo = parseResolveInfo(info).fieldsByTypeName;
  let include = {};
  if (resolveInfo.User.posts) include.posts = {};
  if (resolveInfo.User.likes) include.likes = {};
  if (resolveInfo.User.comments) include.comments = {};
  if (resolveInfo.User.following) {
    include.following = {};
    if (resolveInfo.User.following.fieldsByTypeName.Follow.user)
      include.following = { include: { user: {} } };
  }
  if (resolveInfo.User.followers) {
    include.followers = {};
    if (resolveInfo.User.followers.fieldsByTypeName.Follow.user)
      include.followers = { include: { user: {} } };
  }

  include = Object.keys(include).length ? include : undefined;

  return await db.user.findMany({
    where: {
      ...args.input,
    },
    include,
  });
};

exports.updateUser = async (root, args, context, info) => {
  try {
    let user = await db.user.findUnique({ where: { id: args.input.id } });
    if (!user) {
      throw new Error(`NOT_EXISTS`);
    }
    if (user.id != context.user.id) {
      throw new Error(`UNAUTHORIZED`);
    }

    return await db.user.update({
      where: {
        id: args.input.id,
      },
      data: {
        name: args.input.name,
        bio: args.input.bio,
        profilePictureUrl: args.input.profilePictureUrl,
        privacy: args.input.privacy,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteUser = async (root, args, context) => {
  try {
    let user = await db.user.findUnique({ where: { id: args.input.id } });
    if (!user) {
      throw new Error(`NOT_EXISTS`);
    }
    if (user.id != context.user.id) {
      throw new Error(`UNAUTHORIZED`);
    }

    let { count } = await db.user.deleteMany({
      where: { id: user.id },
    });
    return count;
  } catch (err) {
    throw new Error(err);
  }
};
