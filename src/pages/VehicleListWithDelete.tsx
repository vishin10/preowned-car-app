import React, { useEffect, useState } from 'react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl?: string;
}

const VehicleListWithDelete: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchVehicles = async () => {
    const res = await fetch('http://localhost:4000/api/admin/vehicles');
    const data = await res.json();
    setVehicles(data);
    setFilteredVehicles(data.slice(0, 6)); // show first 6 initially
  };

  const deleteVehicle = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      await fetch(`http://localhost:4000/api/admin/vehicles/${id}`, {
        method: 'DELETE',
      });
      alert('Vehicle deleted successfully.');
      fetchVehicles(); // refresh list
    } catch (err) {
      alert('Failed to delete vehicle.');
    }
  };

  useEffect(() => {
    fetchVehicles();
    setIsAdmin(localStorage.getItem("role") === "admin");
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pre-Owned Vehicles</h2>
      {filteredVehicles.length === 0 ? (
        <p>No vehicles added yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((car) => (
            <div key={car.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{car.year} {car.make} {car.model}</h3>
              <p><strong>Price:</strong> ${car.price}</p>
              {car.imageUrl && (
                <img src={car.imageUrl} alt="Car" className="w-full h-40 object-cover mt-2" />
              )}
              {isAdmin && (
                <button
                  onClick={() => deleteVehicle(car.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleListWithDelete;
