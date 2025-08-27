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
import PrivacyPolicy from './components/PrivacyPolicy';
import LegalNotice from './components/LegalNotice';
import CookiePolicy from './components/CookiePolicy';
import { isLoggedIn } from './utils/auth';

function App() {
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Solo verificar autenticación si estamos en /admin
    const checkAuth = async () => {
      if (window.location.pathname === '/admin') {
        try {
          const loggedIn = await isLoggedIn();
          setIsAdminLogged(loggedIn);
        } catch (error) {
          setIsAdminLogged(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Si no estamos en /admin, no verificar sesión
        setIsLoading(false);
      }
    };

    checkAuth();

    // Solo verificar autenticación cada 5 minutos si estamos en /admin
    const interval = setInterval(() => {
      if (window.location.pathname === '/admin') {
        checkAuth();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAdminLogged(true);
    navigate('/admin');
  };

  // Mostrar loading mientras verifica la sesión
  if (isLoading && window.location.pathname === '/admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Verificando sesión...</div>
      </div>
    );
  }

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
        <Route
          path="/privacy"
          element={
            <>
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/legal"
          element={
            <>
              <LegalNotice />
              <Footer />
            </>
          }
        />
        <Route
          path="/cookies"
          element={
            <>
              <CookiePolicy />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
