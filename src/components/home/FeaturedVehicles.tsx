import React from 'react';
import { ChevronRight } from 'lucide-react';

import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect, useState } from 'react';

import Container from '../ui/Container';
import Button from '../ui/Button';
import VehicleCard from '../vehicles/VehicleCard';

const FeaturedVehicles: React.FC = () => {
  // Get a subset of vehicles to feature
const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);

useEffect(() => {
  const fetchVehicles = async () => {
    const q = query(collection(db, 'vehicles'), orderBy('year', 'desc'), limit(3));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFeaturedVehicles(data);
  };

  fetchVehicles();
}, []);
  
  return (
    <section className="py-16 bg-gray-50" id="featured">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl">Discover our hand-picked selection of premium vehicles, each offering exceptional quality, performance, and value.</p>
          </div>
          <a 
            href="#vehicles" 
            className="hidden md:flex items-center text-red-600 font-medium hover:text-red-700 transition-colors mt-4 md:mt-0"
          >
            View all vehicles
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Button 
            variant="outline" 
            icon={<ChevronRight className="w-5 h-5" />}
            iconPosition="right"
          >
            View all vehicles
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedVehicles;