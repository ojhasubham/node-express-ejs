const express = require("express");
const router = express.Router();
const emailController = require("../controllers/EmailSubscribe");

router.post("/emailSubscrib", emailController.create_email_subscribe);
router.post("/findPosition", emailController.findPosition);

module.exports = router;
