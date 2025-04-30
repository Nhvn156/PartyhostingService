import React, { useEffect, useState } from 'react';
import './Admin.css';

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/requests")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const markAsCompleted = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}/complete`, {
        method: 'PUT'
      });
      const updated = await res.json();
      setOrders(prev =>
        prev.map(r => r._id === id ? { ...r, completed: true } : r)
      );
    } catch (err) {
      alert("❌ Không thể cập nhật trạng thái");
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container py-5">
        <h2 className="mb-4 text-center text-primary">Quản lý đơn đặt và tư vấn</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped bg-white shadow">
            <thead className="table-light">
              <tr>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Dịch vụ</th>
                <th>Nội dung</th>
                <th>Ngày gửi</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.serviceType}</td>
                  <td>{item.request}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    {item.completed ? (
                      <span className="text-success">✔ Đã hoàn thành</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => markAsCompleted(item._id)}
                      >
                        ✅ Hoàn thành
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="7" className="text-center">Không có dữ liệu</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
