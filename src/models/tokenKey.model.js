const mongoose = require("mongoose")
const Schema = mongoose.Schema

const keySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    publicKey: { type: String, require: true },
    privateKey: { type: String, requrie: true },
    refreshToken: { type: String, require: true },
    refreshTokenUsed: { type: Array, default: [] },
}, { timestamps:true, collection:"TokenKey" })

const Key = mongoose.model("TokenKey", keySchema)
module.exports = Key