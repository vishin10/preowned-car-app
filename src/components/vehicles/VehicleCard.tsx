import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails?: () => void; // allow modal opening
}

const fallbackImage = 'https://via.placeholder.com/400x300?text=No+Image';

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onViewDetails }) => {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(vehicle?.price ?? 0);

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(); // open modal from parent
    } else {
      navigate(`/vehicles?vehicleId=${vehicle?.id}`); // fallback: navigate
    }
  };

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      id={`vehicle-${vehicle?.id}`}
    >
      <div className="relative">
        <img
          src={vehicle?.images?.[0] || vehicle?.imageUrl || fallbackImage}
          alt={`${vehicle?.year ?? ''} ${vehicle?.make ?? ''} ${vehicle?.model ?? ''}`}
          className="w-full h-48 object-cover"
          loading="lazy"
        />

        {vehicle?.condition === 'new' && (
          <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </div>
        )}

        {vehicle?.sold && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            SOLD
          </div>
        )}

        <div className="absolute top-4 right-4 bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {formattedPrice}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {vehicle?.year ?? 'Year'} {vehicle?.make ?? 'Make'} {vehicle?.model ?? 'Model'}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle?.bodyType && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              {vehicle.bodyType}
            </span>
          )}
          {vehicle?.mileage && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {Number(vehicle.mileage).toLocaleString()} miles
            </span>
          )}
          {vehicle?.transmission && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {vehicle.transmission}
            </span>
          )}
          {vehicle?.fuelType && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {vehicle.fuelType}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vehicle?.description || 'No description available.'}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={handleViewDetails}
            className="text-red-600 font-medium flex items-center hover:text-red-700 transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
