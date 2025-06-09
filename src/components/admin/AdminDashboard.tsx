import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  fuelType?: string;
  transmission?: string;
  images?: string[];
  sold?: boolean;
  featured?: boolean;
};

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchVehicles = async () => {
    const snapshot = await getDocs(collection(db, "vehicles"));
    const data = snapshot.docs.map((doc) => {
      const raw = doc.data();
      return {
        id: doc.id,
        ...raw,
        year: Number(raw.year),
        price: Number(raw.price),
    images: Array.isArray(raw.images) ? raw.images : [], // ✅ FIX
      };
    }) as Vehicle[];
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);


const handleUnmarkFeatured = async (vehicleId: string) => {
  try {
    const ref = doc(db, 'vehicles', vehicleId);
    await updateDoc(ref, { featured: false });

    // Update local state
    setVehicles(prev =>
      prev.map(v =>
        v.id === vehicleId ? { ...v, featured: false } : v
      )
    );
  } catch (err) {
    console.error("❌ Failed to unmark as featured:", err);
  }
};


const handleMarkAsFeatured = async (vehicleId: string) => {
  try {
    const ref = doc(db, 'vehicles', vehicleId);
    await updateDoc(ref, { featured: true });

    setVehicles(prev =>
      prev.map(v =>
        v.id === vehicleId ? { ...v, featured: true } : v
      )
    );
  } catch (err) {
    console.error("❌ Failed to mark as featured:", err);
  }
};


  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const res = await fetch(`${baseUrl}/api/admin/delete-vehicle/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Vehicle deleted ✅");
        fetchVehicles();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      alert("❌ Error deleting vehicle");
      console.error(err);
    }
  };

const handleMarkSold = async (vehicleId: string) => {
  try {
    const vehicleRef = doc(db, 'vehicles', vehicleId);

    // 1. Mark as sold in Firestore
    await updateDoc(vehicleRef, {
      sold: true,
      soldAt: serverTimestamp(),
    });

    // 2. Update local UI to show "SOLD"
    setVehicles(prev =>
      prev.map(v =>
        v.id === vehicleId ? { ...v, sold: true } : v
      )
    );

    // 3. After 2 seconds, remove from frontend
    setTimeout(() => {
      setVehicles(prev => prev.filter(v => v.id !== vehicleId));
    }, 2000);

  } catch (error) {
    console.error("Failed to mark as sold:", error);
  }
};



  const handleEdit = (vehicle: Vehicle) => {
    navigate("/add-vehicle", { state: { editData: vehicle } });
  };
return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Admin Vehicles</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="border p-4 rounded shadow">
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
          <p><strong>Featured:</strong> {vehicle.featured ? "🌟 Yes" : "No"}</p>

          <div className="mt-3 flex flex-wrap gap-2">
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

            <button
              onClick={() => handleEdit(vehicle)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>

            {vehicle.featured ? (
  <button
    onClick={() => handleUnmarkFeatured(vehicle.id)}
    className="bg-yellow-700 text-white px-3 py-1 rounded hover:bg-yellow-800"
  >
    Unmark as Featured
  </button>
) : (
  <button
    onClick={() => handleMarkAsFeatured(vehicle.id)}
    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
  >
    Mark as Featured
  </button>
)}

          </div>
        </div>
      ))}
    </div>
  </div>
);

}
