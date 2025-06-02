import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';

const contactInfo = [
  { 
    id: 1, 
    title: 'Call Us', 
    content: '(555) 123-4567', 
    icon: Phone,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    id: 2, 
    title: 'Email Us', 
    content: 'info@prestigemotors.com', 
    icon: Mail,
    color: 'bg-red-100 text-red-600'
  },
  { 
    id: 3, 
    title: 'Visit Us', 
    content: '123 Luxury Lane, Prestigeville, CA 90210', 
    icon: MapPin,
    color: 'bg-green-100 text-green-600'
  },
  { 
    id: 4, 
    title: 'Opening Hours', 
    content: 'Mon-Fri: 9AM-7PM | Sat: 10AM-6PM | Sun: Closed', 
    icon: Clock,
    color: 'bg-purple-100 text-purple-600'
  }
];

const ContactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="contact">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to find your dream car? Reach out to our team, and we'll be happy to assist you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152860475393!2d-118.48690642423795!3d34.025211723462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a4cec2910019%3A0xb4170ab5ff23f5f8!2sSanta%20Monica%2C%20CA!5e0!3m2!1sen!2sus!4v1682179227198!5m2!1sen!2sus" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map location"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Vehicle Inquiry</option>
                  <option value="service">Service Appointment</option>
                  <option value="parts">Parts & Accessories</option>
                  <option value="financing">Financing Options</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help you today?"
                />
              </div>
              
              <Button type="submit" fullWidth>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;