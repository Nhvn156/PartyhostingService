import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');

    // ✅ Kiểm tra đăng nhập
    if (!currentUser) {
      alert("⛔ Bạn cần đăng nhập để truy cập trang này.");
      navigate('/login');
      return;
    }

    const user = JSON.parse(currentUser);

    // ✅ Kiểm tra quyền admin
    if (user.role !== 'admin') {
      alert("⛔ Bạn không có quyền truy cập trang quản trị.");
      navigate('/');
      return;
    }

    // ✅ Nếu hợp lệ thì gọi API
    fetch("http://localhost:5000/api/requests")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [navigate]);

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

  const currencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case 'USD': return '$';
      case 'VND': return '₫';
      case 'JPY': return '¥';
      case 'EUR': return '€';
      default: return currencyCode;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !dateString || isNaN(date) ? '—' : date.toLocaleDateString('vi-VN');
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
                <th>Thời gian tổ chức</th>
                <th>Ngân sách</th>
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
                  <td>{formatDate(item.time)}</td>
                  <td>
                    {item.budget?.amount
                      ? `${Number(item.budget.amount).toLocaleString('vi-VN')} ${currencySymbol(item.budget.currency)}`
                      : '—'}
                  </td>
                  <td>{item.serviceType}</td>
                  <td style={{ whiteSpace: 'pre-line' }}>{item.request}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    {item.completed ? (
                      <span className="text-success">✔ Hoàn thành</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => markAsCompleted(item._id)}
                      >
                        ❌ Hoàn thành
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
