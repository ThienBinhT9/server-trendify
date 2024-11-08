const AuthService = require("../services/auth.service");

const geoip = require("geoip-lite");
const UAParser = require('ua-parser-js');

class AuthController {
  async signIn(req, res) {
    try {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;

      const userAgent = req.headers['user-agent'];
      const parser = new UAParser();
      parser.setUA(userAgent);
      const result = parser.getResult();

      console.log({result});
      
      
      
      return res.status(200).json(await AuthService.signIn(req.body, ip));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async signUp(req, res) {
    try {
      return res.status(200).json(await AuthService.signUp(req.body));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async signOut(req, res) {
    try {
      return res.status(200).json(await AuthService.signOut(req.body));
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = new AuthController();
