import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

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

  const handleMarkSold = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/admin/mark-sold/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        alert("Vehicle marked as sold ✅");
        fetchVehicles();
      } else {
        throw new Error("Failed to mark as sold");
      }
    } catch (err) {
      alert("❌ Error updating vehicle status");
      console.error(err);
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
