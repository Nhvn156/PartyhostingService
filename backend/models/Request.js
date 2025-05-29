const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  phone:       { type: String, required: true },
  email:       { type: String, required: true },
  time:        { type: Date,   required: true },
  request:     { type: String, required: true },
  serviceType: { type: String, required: true },
  completed:   { type: Boolean, default: false },

  // ✅ Ngân sách với ràng buộc rõ ràng
  budget: {
    amount: {
      type: Number,
      required: [true, 'Vui lòng nhập số tiền ngân sách'],
      min: [1000, 'Ngân sách phải lớn hơn 1,000'],
    },
    currency: {
      type: String,
      enum: ['USD', 'VND', 'JPY', 'EUR'],
      default: 'USD',
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);
