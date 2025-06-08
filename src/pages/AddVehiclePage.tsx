import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import AddCarForm from '../components/admin/AddCarForm';
import { useNavigate } from 'react-router-dom';



const AddVehiclePage: React.FC = () => {
  const { isAdmin, login, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = () => {
    const success = login(formData.username, formData.password);
    if (!success) {
      alert("Invalid username or password");
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6 max-w-md mx-auto mt-10 border rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>

        <input
          className="mb-2 w-full border p-2 rounded"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          className="mb-4 w-full border p-2 rounded"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add Pre-owned Vehicle</h2>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/admin/vehicles')}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Manage Vehicles
          </button>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      <AddCarForm />
    </div>
  );
};

export default AddVehiclePage;