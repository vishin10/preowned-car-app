import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import Services from '../components/home/Services';
import Testimonials from '../components/home/Testimonials';
import AboutUs from '../components/home/AboutUs';
import ContactSection from '../components/home/ContactSection';
import VehiclesList from '../components/vehicles/VehiclesList';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <VehiclesList />
      <Services />
      <AboutUs />
      <Testimonials />
      <ContactSection />
      <div className="py-16 bg-gray-50">
      </div>
    </>
  );
};

export default HomePage;