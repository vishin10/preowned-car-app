import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  color: string;
  bodyType: string;
  features: string[];
  description: string;
  imageUrl: string; // ✅ required for rendering
}

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      const snapshot = await getDocs(collection(db, 'vehicles'));

      const data: Vehicle[] = snapshot.docs.map(doc => {
        const d = doc.data();

        const images = d.images ?? (d.imageUrl ? [d.imageUrl] : []);
        const imageUrl = images[0] ?? ''; // ✅ fallback to first image or empty

        return {
          id: doc.id,
          make: d.make,
          model: d.model,
          year: Number(d.year),
          price: Number(d.price),
          mileage: Number(d.mileage),
          fuelType: d.fuelType,
          transmission: d.transmission,
          engineSize: d.engineSize,
          color: d.color,
          bodyType: d.bodyType,
          description: d.description,
          features: typeof d.features === 'string'
            ? d.features.split(',').map((f: string) => f.trim())
            : d.features ?? [],
          imageUrl, // ✅ required for your UI
        };
      });

      setVehicles(data);
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  return { vehicles, loading };
};
