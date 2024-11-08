const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "shopOwner", "admin"], default: "customer" },
  shops: { type: Schema.Types.ObjectId, ref: "Shop" },
  avatar: { type: String },
  addresses: [
    {
      addressLine: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      isDefault: { type: Boolean, default: false }
    }
  ],
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
  notifications: [
    {
      message: String,
      read: { type: Boolean, default: false }, 
      createdAt: { type: Date, default: Date.now } 
    }
  ],
  cart: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 } 
    }
  ],
  bill: [
    {
      orderId: {type: Schema.Types.ObjectId, ref: "Order" },
      purchaseDate: Date, 
      totalAmount: Number,
    }
  ],
  isVerified: { type: Boolean, default: false },
}, { timestamps:true, collection:"User" });

const User = mongoose.model("User", userSchema);
module.exports = User;
