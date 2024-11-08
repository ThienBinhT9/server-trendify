const router = require("express").Router()
const MailController = require("../controllers/mailer.controller");

router.post("/sendOTP", MailController.SendOTP)
router.post("/verifyOTP", MailController.VerifyOTP)

module.exports = router