const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/auth", authController.getAuthToken);
router.post("/auth", authController.getAuthToken);

module.exports = router;
