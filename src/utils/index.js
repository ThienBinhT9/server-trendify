const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const geoip = require("geoip-lite");
const _ = require("lodash");

const Key = require("../models/tokenKey.model")

const countConnectMongoDB = () => {
  const count = mongoose.connections.length;
  console.log(`Số lượng connect tới MongoDB: ${count}`);

  return count;
};

const generateTokens = ({ payload, privateKey }) => {
  const accessToken = JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "20m",
  });

  const refreshToken = JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "7 days",
  });

  return payload && privateKey ? { accessToken, refreshToken } : null;
};

const generateKeys = async({refreshToken, publicKey, privateKey, userId}) => {
      try {
        const key = Key.findOneAndUpdate(
          { userId }, 
          {
            publicKey,
            privateKey,
            refreshToken
          }, 
          { upsert: true, new: true }
        ).lean()

        return key ? key : null
      } catch (error) {
        return null
      }
}

const removeKey = async({userId}) => {
    try {
      const result = await Key.findOneAndDelete({userId}).lean()
      return result
    } catch (error) {
      return { code:500, message:error.message }
    }
}

const getInfoData = ({object, feilds = []}) => {
    return _.pick(object, feilds)
}

const handleInfoLogin = (newLogin, preLogin) => {
  const newLocation = geoip.lookup(newLogin?.ip)

  const idChanged = newLogin?.ip !== preLogin?.ip
  const userAgentChanged = newLogin?.userAgent !== preLogin?.userAgent

  return idChanged || userAgentChanged

}

module.exports = { countConnectMongoDB, generateTokens, generateKeys, removeKey, getInfoData, handleInfoLogin };