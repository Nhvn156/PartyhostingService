const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const Request = require('../models/Request'); // Import model

// ---------------------- AUTH ----------------------
router.post('/register', registerUser);
router.post('/login', loginUser);

// ---------------------- REQUEST - POST ----------------------
router.post('/requests', async (req, res) => {
  console.log('📥 Dữ liệu tư vấn nhận được:', req.body);

  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    console.log('✅ Lưu thành công');
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('❌ Lỗi khi lưu tư vấn:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

// ---------------------- REQUEST - GET ----------------------
router.get('/requests', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('❌ Lỗi lấy danh sách:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

router.put('/requests/:id/complete', async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('❌ Lỗi đánh dấu hoàn thành:', err.message);
    res.status(500).json({ message: err.message });
  }
});
