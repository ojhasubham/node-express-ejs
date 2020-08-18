const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/EmailSubscribe");

router.post("/emailSubscrib", EmailController.create_email_subscribe);
router.get("/userDetail", EmailController.userDetail);

module.exports = router;
