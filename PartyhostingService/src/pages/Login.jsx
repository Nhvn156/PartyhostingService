import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        sessionStorage.setItem("currentUser", JSON.stringify(data.user)); // ✅ lưu session
        setUser(data.user);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối đến server');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Mật khẩu</label>
          <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
