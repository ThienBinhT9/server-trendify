const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);