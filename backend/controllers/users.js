const db = require("../prisma/db");

exports.getUsers = async (root, args, context) => {
  return await db.user.findMany({
    where: {
      id: args.id,
    },
  });
};
