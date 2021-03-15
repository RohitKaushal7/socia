const { PrismaClient } = require("@prisma/client");

let db = global.db || new PrismaClient();
global.db = db;

// check to use this workaround only in development and not in production
// if (process.env.NODE_ENV === "production") {
//   db = new PrismaClient();
// } else {
//   if (!global.db) {
//     global.db = new PrismaClient();
//   }
//   db = global.db;
// }

module.exports = db;
