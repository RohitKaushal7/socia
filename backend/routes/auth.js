const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/auth", authController.getAuthToken);
router.post("/signup", authController.createAccount);

module.exports = router;
