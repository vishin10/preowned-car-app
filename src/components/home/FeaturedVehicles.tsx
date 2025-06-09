import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import Container from '../ui/Container';
import Button from '../ui/Button';
import VehicleCard from '../vehicles/VehicleCard';

const FeaturedVehicles: React.FC = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const q = query(
          collection(db, 'vehicles'),
          where('featured', '==', true)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeaturedVehicles(data);
      } catch (error) {
        console.error("Error fetching featured vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="py-16 bg-gray-50" id="featured">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Vehicles</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our hand-picked selection of premium vehicles, each offering exceptional quality, performance, and value.
            </p>
          </div>
          <a 
            href="#vehicles" 
            className="hidden md:flex items-center text-red-600 font-medium hover:text-red-700 transition-colors mt-4 md:mt-0"
          >
            View all vehicles
            <ChevronRight className="w-5 h-5 ml-1" />
          </a>
        </div>

        {featuredVehicles.length === 0 ? (
          <p className="text-gray-500">No featured vehicles available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

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
