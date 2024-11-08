const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopShema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  ratings: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps:true, collection:"Shop" });

const Shop = mongoose.model("Shop", shopShema);
module.exports = Shop;
