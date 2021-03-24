const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../prisma/db");

exports.getAuthToken = async (req, res) => {
  const { email, password } = req.body;

  let user = await db.user.findUnique({ where: { email: email } });
  if (!user)
    return res
      .status(400)
      .json({ errors: { email: "No Account with this Email" } });

  let match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ errors: { password: "Wrong Password" } });

  let token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({ user, token });
};

exports.createAccount = async (req, res) => {
  const { email, password } = req.body;

  let user = await db.user.findUnique({ where: { email: email } });
  if (user)
    return res
      .status(400)
      .json({ errors: { email: "Account with this Email Already Exists" } });

  const hashedPassword = await bcrypt.hash(password, 8);

  user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  let token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({ user, token });
};
