const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const getAuthUser = require("../middleware/getAuthUser");

module.exports = {
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let user = null;

    try {
      authToken = req.headers["authorization"];
      if (authToken || true) {
        user = await getAuthUser(authToken);
      }
    } catch (err) {
      console.warn(err.message);
    }

    return {
      authToken,
      user,
    };
  },
};
