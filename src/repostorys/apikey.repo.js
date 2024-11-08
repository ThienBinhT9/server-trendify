const ApiKey = require("../models/apiKey.model");

const findApiKey = async (key) =>
  await ApiKey.findOne({ key, status: true }).lean();

module.exports = { findApiKey };
