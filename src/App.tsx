import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AddVehiclePage from './pages/AddVehiclePage';
import AdminDashboard from './components/admin/AdminDashboard';
import './index.css';
import AdminVehicleList from './components/admin/AdminVehicleList';

const AppContent = () => {
  const location = useLocation();

  // ✅ Hide layout for these routes
  const hideLayoutRoutes = ['/add-vehicle', '/admin/vehicles'];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(anchor.getAttribute('href') || '');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-vehicle" element={<AddVehiclePage />} />
          <Route path="/admin/vehicles" element={<AdminDashboard />} />
          <Route path="/admin/vehicles" element={<AdminVehicleList />} />

        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter> 
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
