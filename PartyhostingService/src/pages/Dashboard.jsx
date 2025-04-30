import React from 'react';
import { Link } from 'react-router-dom'; // Thêm Link để chuyển trang

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

function Dashboard({ user }) {
  return (
    <div className="container py-4">
      <div className="bg-light p-4 rounded shadow-sm mb-4 text-center">
        <h2>Chào mừng {user.name} ({user.role})</h2>
        <p>Chúng tôi sẵn sàng hỗ trợ bạn trong mọi giải pháp công nghệ!</p>
      </div>
      <h3 className="text-center mb-4">Dịch vụ nổi bật tại PartyPlanner</h3>
      <div className="row">
        {services.map(service => (
          <div className="col-12 col-md-6 mb-4" key={service.id}>
            <Link to={service.path} style={{ textDecoration: 'none' }}>
              <div className="card h-100 border-primary shadow-sm hover-shadow-lg transition duration-300 cursor-pointer">
                <div className="card-body">
                  <h5 className="card-title text-primary">{service.title}</h5>
                  <p className="card-text text-dark">{service.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
