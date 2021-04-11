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
