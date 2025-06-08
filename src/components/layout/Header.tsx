import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, Car } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Add this line
import Container from '../ui/Container';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
const navigate = useNavigate();

  const navLinks = [
    { title: 'Home', path: '#' },
    { title: 'Vehicles', path: '#vehicles' },
    { title: 'Services', path: '#services' },
    { title: 'About Us', path: '#about' },
    { title: 'Contact', path: '#contact' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Car className="w-8 h-8 text-red-600" />
            <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-red-600">
              The Car King on Queen
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-800 hover:text-red-600' : 'text-white hover:text-red-400'
                }`}
              >
                {link.title}
              </a>
            ))}
            {/* ✅ Add Pre-owned Vehicle Link */}
            <Link to="/add-vehicle">
              <span
                className={`font-medium cursor-pointer ${
                  isScrolled ? 'text-blue-600 hover:text-red-600' : 'text-white hover:text-red-400'
                }`}
              >
                Add Pre-owned Vehicle
              </span>
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
           <div className="flex items-center whitespace-nowrap">
  <Phone className={`w-5 h-5 ${isScrolled ? 'text-red-600' : 'text-white'}`} />
  <span className={`ml-2 font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
    (555) 123-4567
  </span>
</div>

<Button
  size="sm"
  onClick={() => {
    sessionStorage.setItem('preselectSubject', 'test-drive'); // Set subject
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); // Scroll to form
  }}
>
  Schedule Test Drive
</Button>


          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.path}
                  className="text-gray-800 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}

              {/* ✅ Mobile Add Pre-owned Vehicle Button */}
              <Link to="/add-vehicle" onClick={() => setIsMenuOpen(false)}>
                <span className="text-blue-600 font-medium">Add Pre-owned Vehicle</span>
              </Link>

              <div className="flex items-center pt-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="ml-2 text-gray-800 font-medium">(555) 123-4567</span>
              </div>
              <Button fullWidth>Schedule Test Drive</Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
