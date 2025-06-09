import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  sold?: boolean;
  images?: string[];
}

const fallbackImage = "https://placehold.co/400x300?text=No+Image";

const AdminVehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = async () => {
    const snapshot = await getDocs(collection(db, 'vehicles'));
    const data = snapshot.docs.map(doc => {
      const raw = doc.data();
      return {
        id: doc.id,
        ...raw,
        year: Number(raw.year),
        price: Number(raw.price),
        images: raw.images || [],
      };
    }) as Vehicle[];
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

const res = await fetch(`${baseUrl}/api/admin/delete-vehicle/${id}`, {
  method: 'DELETE',
});

      if (res.ok) {
        alert('Vehicle deleted ✅');
        fetchVehicles();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err) {
      alert('❌ Error deleting vehicle');
      console.error(err);
    }
  };

  const handleMarkSold = async (id: string) => {
    try {
     const baseUrl = import.meta.env.VITE_API_BASE_URL;

const res = await fetch(`${baseUrl}/api/admin/mark-sold/${id}`, {
  method: 'PATCH',
});

      if (res.ok) {
        alert('Vehicle marked as sold ✅');
        fetchVehicles();
      } else {
        throw new Error('Failed to mark as sold');
      }
    } catch (err) {
      alert('❌ Error updating vehicle status');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Vehicle List</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="border p-4 rounded mb-4 shadow">
              <img
                src={vehicle.images?.[0] || fallbackImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <p><strong>Make:</strong> {vehicle.make}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Year:</strong> {vehicle.year}</p>
              <p><strong>Price:</strong> ${vehicle.price}</p>
              <p><strong>Sold:</strong> {vehicle.sold ? "✅ Yes" : "❌ No"}</p>

              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => handleDelete(vehicle.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>

                {!vehicle.sold && (
                  <button
                    onClick={() => handleMarkSold(vehicle.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Mark as Sold
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVehicleList;
