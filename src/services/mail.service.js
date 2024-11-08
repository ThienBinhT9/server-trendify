const crypto = require("crypto");
const dotenv = require("dotenv");
const NodeCache = require("node-cache");

const { transporterMail } = require("../configs/mailer.config");

dotenv.config();
const otpCache = new NodeCache({ stdTTL: 120 });

class MailService {
  async sendOTP(email) {
    try {
      const otp = crypto.randomInt(100000, 999999);
      const otpToken = crypto.randomBytes(16).toString("hex");

      otpCache.set(otpToken, otp);

      const mailOptions = {
        from: process.env.MAIL_ADMIN,
        to: email,
        subject: `Trendify gửi cho bạn thông báo`,
        text: `Mã OTP của bạn là ${otp}. Hãy xác nhận bằng mã này trong 120 giây!`,
      };

      const response = await transporterMail.sendMail(mailOptions);
      if (response.accepted.length === 0) {
        return { code: 400, message: "Send mail failed" };
      }

      return {
        code: 200,
        metadata: { message: "Send OTP successfully", data: otpToken },
      };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  verifyOTP(token, otp) {
    try {
      const cacheOtp = otpCache.get(token);
      if (!cacheOtp) return { code: 400, message: "OTP is not valid" };

      if (cacheOtp.toString() !== otp)
        return { code: 400, message: "OTP is not valid" };

      return { code: 200, message: "OTP verified successfully" };
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }
}

module.exports = new MailService();
