const MailService = require("../services/mail.service");

class MailController {
  async SendOTP(req, res) {
    try {
      return res.status(200).json(await MailService.sendOTP(req.body.email));
    } catch (error) {
      return res.status(500).json({ code: 500, message: error.message });
    }
  }

  async VerifyOTP(req, res) {
    try {
      const { otpToken: token, otp } = req.body;
      return await res.status(200).json(await MailService.verifyOTP(token, otp));
    } catch (error) {
      return res.status(500).json({ code: 500, message: error.message });
    }
  }
}

module.exports = new MailController();
