import React, { useState, useEffect } from 'react';
import './Services.css';

export default function CorporateService() {
  const [nameInput, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Vui lòng đăng nhập trước khi gửi yêu cầu tư vấn.");
      return;
    }

    const body = {
      name: nameInput,
      phone,
      email,
      request,
      serviceType: "Công ty"
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        alert("Đã gửi yêu cầu tư vấn thành công!");
        setName(''); setPhone(''); setEmail(''); setRequest('');
      } else {
        const err = await res.json();
        alert("Gửi thất bại: " + err.message);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    }
  };

  return (
    <div className="service-detail">
      <div className="banner">
        <div className="overlay">
          <h1>Sự Kiện Công Ty</h1>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4">
            <img
              src="https://www.starseventdesign.com/wp-content/uploads/2015/07/Corporate-Events.jpg"
              alt="Sự Kiện Công Ty"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h3 className="mb-3">Tư vấn dịch vụ sự kiện công ty</h3>
            <ul>
              <li>Hội nghị, Gala dinner, Team building</li>
              <li>Trang trí backdrop, sân khấu</li>
              <li>Âm thanh, ánh sáng chuyên nghiệp</li>
              <li>Gói linh hoạt theo ngân sách</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="booking-form py-5">
        <div className="container">
          <div className="bg-white p-4 rounded shadow">
            <h4 className="mb-3 text-center text-primary">Đặt lịch tư vấn ngay</h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Họ và tên</label>
                  <input type="text" className="form-control" value={nameInput} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Số điện thoại</label>
                  <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="col-md-12 mb-3">
                  <label>Nội dung cần tư vấn</label>
                  <textarea className="form-control" rows="4" value={request} onChange={(e) => setRequest(e.target.value)} required />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">Đặt ngay</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
