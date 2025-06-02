import React from 'react';
import { Car, DollarSign, Wrench, ShieldCheck } from 'lucide-react';
import Container from '../ui/Container';

const services = [
  {
    id: 1,
    title: 'Vehicle Sales',
    description: 'Explore our extensive inventory of premium new and pre-owned vehicles from top luxury brands.',
    icon: Car,
    color: 'bg-blue-100 text-blue-900'
  },
  {
    id: 2,
    title: 'Financing Solutions',
    description: 'Our finance experts will help you find the perfect leasing or financing option to suit your budget.',
    icon: DollarSign,
    color: 'bg-green-100 text-green-900'
  },
  {
    id: 3,
    title: 'Service & Maintenance',
    description: 'Keep your vehicle performing at its best with our factory-trained technicians and state-of-the-art facilities.',
    icon: Wrench,
    color: 'bg-amber-100 text-amber-900'
  },
  {
    id: 4,
    title: 'Extended Warranty',
    description: 'Drive with confidence knowing you\'re covered with our comprehensive extended warranty options.',
    icon: ShieldCheck,
    color: 'bg-purple-100 text-purple-900'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-16 bg-white" id="services">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experience premium automotive care with our comprehensive range of services designed to exceed your expectations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg p-8 shadow-md transition-transform duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mb-6`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-950 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-white mb-4">Premium Care for Premium Vehicles</h3>
              <p className="text-gray-300 mb-6">
                At The Car King on Queen, we understand the unique needs of luxury vehicles. Our comprehensive service packages are designed to maintain the performance, value, and driving experience of your premium automobile.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-red-600 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Factory-trained technicians specialized in luxury brands</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-600 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">State-of-the-art diagnostic equipment and facilities</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-600 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Genuine OEM parts and premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-600 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Complimentary vehicle health checks and inspections</span>
                </li>
              </ul>
              <a href="#contact" className="inline-block bg-red-600 text-white font-medium px-6 py-3 rounded-md hover:bg-red-700 transition-colors">
                Schedule Service
              </a>
            </div>
            <div className="hidden lg:block bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;