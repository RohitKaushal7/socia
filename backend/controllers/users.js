const db = require("../prisma/db");
const { parseResolveInfo } = require("graphql-parse-resolve-info");

exports.getUsers = async (root, args, context, info) => {
  let resolveInfo = parseResolveInfo(info).fieldsByTypeName;
  let include = {};
  if (resolveInfo.User.following) include.following = {};
  if (resolveInfo.User.followers) include.followers = {};
  if (resolveInfo.User.posts) include.posts = {};
  if (resolveInfo.User.likes) include.likes = {};
  if (resolveInfo.User.comments) include.comments = {};

  return await db.user.findMany({
    where: {
      ...args.input,
    },
    include,
  });
};
