const jwt = require("jsonwebtoken");
const db = require("../prisma/db");

exports.getAuthToken = (req, res) => {
  const { email, password } = req.body;

  let token = jwt.sign({ id: 1, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json(token);
};
