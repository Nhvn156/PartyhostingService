import React, { useState, useEffect } from 'react';
import './Services.css';

export default function BirthdayService() {
  const [nameInput, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('');
  const [request, setRequest] = useState('');
  const [options, setOptions] = useState({
    mc: false,
    photo: false,
    games: false,
    themedCake: false,
    cocktail: false
  });

  // Lấy thông tin người dùng nếu đã đăng nhập
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedOptions = Object.entries(options)
      .filter(([_, value]) => value)
      .map(([key]) => {
        switch (key) {
          case 'mc': return 'MC dẫn chương trình';
          case 'photo': return 'Chụp ảnh - quay video';
          case 'games': return 'Đội hoạt náo & Game';
          case 'themedCake': return 'Bánh kem theo chủ đề';
          case 'cocktail': return 'Đồ uống/Cocktail đặc biệt';
          default: return '';
        }
      });

    const fullRequest = `${request}\n\nGói dịch vụ chọn thêm:\n- ${selectedOptions.join('\n- ')}`;

    const body = {
      name: nameInput,
      phone,
      email,
      time,
      request: fullRequest,
      serviceType: 'Sinh nhật'
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        alert("🎉 Gửi yêu cầu tư vấn thành công!");
        setRequest('');
        setOptions({ mc: false, photo: false, games: false, themedCake: false, cocktail: false });
      } else {
        const err = await res.json();
        alert("❌ Gửi thất bại: " + (err.message || JSON.stringify(err)));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi kết nối server.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-start">
        {/* Cột ảnh */}
        <div className="col-md-6 mb-4">
           <img
            src="https://modernwedding.com.au/wp-content/uploads/2020/06/04/Wedding-Decor-Ideas.jpg"
            alt="Tiệc Cưới Sang Trọng Setup"
            style={{ width: '520px', height: '340px', objectFit: 'cover' }}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Cột mô tả + lựa chọn */}
        <div className="col-md-6">
            <h3 className="mb-3">Tổ chức lễ cưới trọn gói</h3>
            <ul>
              <li>Trang trí theo concept yêu cầu</li>
              <li>Ban nhạc, MC, chụp ảnh quay phim</li>
              <li>Thực đơn đa dạng, Âu – Á</li>
              <li>Tư vấn & kế hoạch chi tiết</li>
            </ul>

          <h5 className="fw-semibold mb-2">Tuỳ chọn gói dịch vụ:</h5>
          <div className="mb-4">
            {[
              { key: 'mc', label: 'MC dẫn chương trình' },
              { key: 'photo', label: 'Chụp ảnh - quay video' },
              { key: 'games', label: 'DJ và âm nhạc' },
              { key: 'themedCake', label: 'Bánh kem theo chủ đề' },
              { key: 'cocktail', label: 'Đồ uống/Cocktail đặc biệt' },
            ].map(opt => (
              <div className="form-check mb-2" key={opt.key}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={opt.key}
                  checked={options[opt.key]}
                  onChange={() => setOptions({ ...options, [opt.key]: !options[opt.key] })}
                />
                <label className="form-check-label" htmlFor={opt.key}>{opt.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form đăng ký tư vấn */}
      <div className="booking-form mt-5">
        <div className="bg-white p-4 rounded shadow-sm">
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
              <div className="col-md-12 mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <label>Thời gian tổ chức</label>
                <input type="date" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required/>
              </div>
              <div className="col-md-12 mb-3">
                <label>Nội dung cần tư vấn</label>
                <textarea className="form-control" rows="4" value={request} onChange={(e) => setRequest(e.target.value)} required />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-danger px-4">Đặt ngay</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
