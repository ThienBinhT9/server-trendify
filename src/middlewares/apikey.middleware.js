const dotenv = require("dotenv");

const { findApiKey } = require("../repostorys/apikey.repo");

dotenv.config();

const checkApiKey = async (req, res, next) => {
  try {
    const key = req.headers[process.env.API_KEY]?.toString();
    if (!key)
      return res.status(403).json({ code: 403, message: "Forbidden Error" });

    const apikey = await findApiKey(key);
    if (!apikey)
      return res.status(400).json({ code: 400, message: "Authorization" });

    req.apikey = apikey;
    return next();
  } catch (error) {}
};

const checkPermissions = async (permissions) => {
  return (req, res, next) => {
    if (!req.apikey.perrmissions)
      return res.status(403).json({ code: 403, message: "Forbidden Error" });

    const validPermissions = req.apikey.permissions.includes(permissions);
    if (!validPermissions)
      return res.status(403).json({ code: 403, message: "Forbidden Error" });
  };
};

module.exports = { checkApiKey, checkPermissions };
