const users = require("../controllers/users");
const authenticated = require("../middleware/authenticated");
const db = require("../prisma/db");

module.exports = {
  Query: {
    users: authenticated(users.getUsers),
  },
};
