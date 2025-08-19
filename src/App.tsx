import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import Products from './components/Products';
import News from './components/News';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import Navigation from './components/Navigation';

function App() {
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAdminLogged(localStorage.getItem('z3d_admin_logged') === 'true');
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLogged(true);
    localStorage.setItem('z3d_admin_logged', 'true');
    navigate('/admin');
  };

  return (
    <div className="App bg-black text-white overflow-x-hidden">
      <Navigation />
      <Routes>
        <Route
          path="/admin"
          element={
            isAdminLogged ? (
              <AdminPanel />
            ) : (
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products />
              <News />
              <About />
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
