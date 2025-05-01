import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Decor from './pages/services/Decor';
import Corporate from './pages/services/Corporate';
import Wedding from './pages/services/Wedding';
import Birthday from './pages/services/Birthday';
import Test from './pages/services/Test';
import Admin from './pages/Admin';

function App() {
  const [user, setUser] = useState(null);

  const isAdmin = JSON.parse(localStorage.getItem("currentUser"))?.role === "admin";
  <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />} />

  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSetUser = (u) => {
    setUser(u);
    localStorage.setItem("currentUser", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={handleSetUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/service/wedding" element={<Wedding />} />
          <Route path="/service/birthday" element={<Birthday />} />
          <Route path="/service/corporate" element={<Corporate />} />
          <Route path="/service/decor" element={<Decor />} />
          <Route path="/service/test" element={<Test />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
