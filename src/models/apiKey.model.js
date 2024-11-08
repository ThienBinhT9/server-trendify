const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiKeySchema = new Schema(
  {
    status: { type: Boolean, default: true },
    key: { type: String, required: true, unique: true },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  { timestamps: true, collection: "ApiKey" }
);

module.exports = mongoose.model("ApiKey", ApiKeySchema);
