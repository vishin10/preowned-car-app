import React from 'react';
import { Award, Users, Clock, ThumbsUp } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';

const stats = [
  { id: 1, label: 'Years in Business', value: '25+' },
  { id: 2, label: 'Vehicles Sold', value: '10,000+' },
  { id: 3, label: 'Satisfied Customers', value: '9,500+' },
  { id: 4, label: 'Expert Staff', value: '50+' }
];

const values = [
  { 
    id: 1, 
    title: 'Excellence', 
    description: 'We strive for excellence in everything we do, from our vehicle selection to our customer service.', 
    icon: Award,
    color: 'bg-red-100 text-red-600'
  },
  { 
    id: 2, 
    title: 'Integrity', 
    description: 'We believe in transparent and honest dealings with our customers, building trust that lasts a lifetime.', 
    icon: ThumbsUp,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    id: 3, 
    title: 'Customer Focus', 
    description: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations.', 
    icon: Users,
    color: 'bg-green-100 text-green-600'
  },
  { 
    id: 4, 
    title: 'Innovation', 
    description: 'We continuously adapt and improve to offer the latest automotive technologies and services.', 
    icon: Clock,
    color: 'bg-purple-100 text-purple-600'
  }
];

const AboutUs: React.FC = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About The Car King on Queen</h2>
            <p className="text-gray-600 mb-6">
              For over 25 years, The Car King on Queen has been the premier destination for luxury and performance vehicles in the region. What started as a small family business has grown into a respected dealership known for exceptional quality and service.
            </p>
            <p className="text-gray-600 mb-8">
              Our mission is simple: to provide an unparalleled automotive experience. We carefully curate our inventory to offer only the finest vehicles, and our team of experts is dedicated to helping you find the perfect match for your lifestyle and preferences.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-red-600">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <Button>Learn More About Us</Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/97761/pexels-photo-97761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="The Car King on Queen Showroom" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Luxury Car" 
                className="rounded-lg shadow-lg w-64 h-auto object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.id} className="border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                <div className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mb-4`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;