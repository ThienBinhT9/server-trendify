const User = require("../models/user.model");

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).lean();
};

const findUserByPhone = async (phone) => {
  return await User.findOne({ phone }).lean();
};

module.exports = { findUserByEmail, findUserByPhone };
