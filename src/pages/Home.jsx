import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // thêm CSS riêng cho hiệu ứng và ảnh nền

const services = [
  {
    id: 1,
    title: "Tiệc cưới",
    desc: "Không gian cưới sang trọng và lãng mạn.",
    path: "/service/wedding"
  },
  {
    id: 2,
    title: "Sinh nhật",
    desc: "Tổ chức sinh nhật sáng tạo cho mọi lứa tuổi.",
    path: "/service/birthday"
  },
  {
    id: 3,
    title: "Sự kiện công ty",
    desc: "Sự kiện doanh nghiệp chuyên nghiệp và chỉn chu.",
    path: "/service/corporate"
  },
  {
    id: 4,
    title: "Trang trí chủ đề",
    desc: "Decor theo concept, màu sắc, không gian độc đáo.",
    path: "/service/decor"
  }
];

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!JSON.parse(localStorage.getItem("currentUser"));

  const handleClick = (path) => {
    if (isLoggedIn) navigate(path);
    else {
      alert("Vui lòng đăng nhập để xem chi tiết dịch vụ.");
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="hero-content fade-in">
          <h1 className="display-4 fw-bold">PartyPlanner</h1>
          <p className="lead">Chúng tôi tổ chức sự kiện, bạn tận hưởng khoảnh khắc!</p>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4 fade-in">Dịch vụ nổi bật</h2>
        <div className="container">
          <div className="row">
            {services.map(s => (
              <div className="col-md-6 mb-4 fade-in" key={s.id}>
                <div className="border rounded p-4 h-100 bg-light shadow-sm service-box hover-scale">
                  <h4 className="text-dark">{s.title}</h4>
                  <p className="text-muted">{s.desc}</p>
                  <button className="btn btn-dark mt-2" onClick={() => handleClick(s.path)}>Xem chi tiết</button>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
