import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

import Container from '../ui/Container';
import Button from '../ui/Button';
import VehicleCard from '../vehicles/VehicleCard';
import VehicleDetailsModal from '../vehicles/VehicleDetailsModal'; // You need this component

const FeaturedVehicles: React.FC = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

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
        </div>

        {featuredVehicles.length === 0 ? (
          <p className="text-gray-500">No featured vehicles available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
  <VehicleCard
    key={vehicle.id}
    vehicle={vehicle}
    onViewDetails={() => setSelectedVehicle(vehicle)} // ✅ add this
  />
))}

          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline">
            View all vehicles
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
        </div>

        {selectedVehicle && (
          <VehicleDetailsModal
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </Container>
    </section>
  );
};

export default FeaturedVehicles;
