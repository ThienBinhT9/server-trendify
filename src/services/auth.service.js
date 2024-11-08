const bcrypt = require("bcrypt")
const crypto = require("crypto")

const User = require("../models/user.model")

const { findUserByEmail } = require("../repostorys/user.repo")
const { generateTokens, generateKeys, removeKey, getInfoData, handleInfoLogin } = require("../utils")

class AuthService {
  async signIn(body, ip) {
    try {
      const holderUser = await findUserByEmail(body.email)
      if(!holderUser) return { code: 400, message:"Email or password is incorrect"}

      const validPassword = await bcrypt.compare(body.password, holderUser.password)
      if(!validPassword) return {code:400, message:"Email or password is incorrect"}

      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength:4096,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
      })

      const tokens = generateTokens({privateKey, payload:{ userId: holderUser._id }});
      if(tokens === null) return { code:400, message:"Token creation failed!" }

      const keys = generateKeys({
        refreshToken:tokens.refreshToken,
        privateKey,
        publicKey,
        userId:holderUser._id
    })

    if(keys === null){
      await removeKey({userId:holderUser._id});
      return { code: 400, message: "Key creation failed!" };
    }
    const data = getInfoData({object:holderUser, feilds:["username", "email", "role", "avatar", "addresses", "isActive"]})
    return { code:201, metadata:{...tokens, ...data} }
      
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  async signUp(body) {
    try {
        const holderUser = await findUserByEmail(body.email)
        if(holderUser) return { code: 400, message:"Email has been used!"}

        const hashPassword = await bcrypt.hash(body.password, 10)

        console.log({hashPassword});
        

        const newUser = await User({
            ...body,
            password:hashPassword,
        })
        if (!newUser) return { code: 400, message: "Account creation failed!" };

        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: { type: "pkcs1", format: "pem" },
            privateKeyEncoding: { type: "pkcs1", format: "pem" },
          });

        const tokens = generateTokens({privateKey, payload:{ userId: newUser._id }});
        if(tokens === null) return { code:400, message:"Token creation failed!" }

        const keys = generateKeys({
            refreshToken:tokens.refreshToken,
            privateKey,
            publicKey,
            userId:newUser._id
        })
        if(keys === null){
            await removeKey({userId:newUser._id});
            return { code: 400, message: "Key creation failed!" };
        }
        const data = getInfoData({object:newUser, feilds:["username", "email", "role", "avatar", "addresses", "isActive", "isVerified"]})

        await newUser.save()
        return { code:201, metadata:{...tokens, ...data} }
    } catch (error) {
      return { code: 500, message: error.message };
    }
  }

  async signOut(body) {
    try {

    } catch (error) {
      return { code: 500, message: error.message };
    }
  }
}

module.exports = new AuthService();
