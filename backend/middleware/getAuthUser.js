const jwt = require("jsonwebtoken");

const db = require("../prisma/db");

module.exports = async (authToken) => {
  let jwtPayload;
  let user;

  jwtPayload = jwt.verify(authToken, process.env.JWT_SECRET);

  if (jwtPayload) {
    user = db.user.findUnique({
      where: { id: jwtPayload.id },
    });
  }

  return user;
};
