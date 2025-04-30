const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: { type: String, required: true },
  request: { type: String, required: true },
  serviceType: { type: String, required: true },
  completed: { type: Boolean, default: false } // ✅ NEW
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);