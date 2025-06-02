import React, { useState } from 'react';
import AddCarForm from '../components/admin/AddCarForm';

const AddVehiclePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = () => {
    const { username, password } = formData;
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (isAuthenticated || localStorage.getItem('role') === 'admin') {
    return <AddCarForm />;
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-10 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <input
        className="mb-2 w-full border p-2"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        className="mb-4 w-full border p-2"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
};

export default AddVehiclePage;
