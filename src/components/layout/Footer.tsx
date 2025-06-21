import React from 'react';
import { Car, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Container from '../ui/Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Car className="w-8 h-8 text-red-500" />
              <span className="ml-2 text-2xl font-bold">The Car King on Queen</span>
            </div>
            <p className="text-gray-300 mb-6">
              Your trusted partner for premium vehicles. Experience luxury, performance, and exceptional service.
            </p>
            <div className="flex space-x-4">
             <a
  href="https://www.facebook.com/p/The-Car-King-on-Queen-61559027723850/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-300 hover:text-white transition-colors"
>
  <Facebook size={20} />
</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>        
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#vehicles" className="text-gray-300 hover:text-white transition-colors">Vehicles</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">New Vehicles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pre-Owned Vehicles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Financing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Service & Maintenance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Parts & Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">1774 S Queen St, York, PA 17403
</span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@prestigecusmotors.com</span>
              </li>
              <li className="flex">
                <Clock className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Mon-Fri: 9:00 AM - 7:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} The Car King on Queen. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;