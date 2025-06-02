import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { Vehicle } from '../../types';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  // Format the price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(vehicle.price);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        {vehicle.condition === 'new' && (
          <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </div>
        )}
        <div className="absolute top-4 right-4 bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {formattedPrice}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center">
            <Tag className="w-3 h-3 mr-1" />
            {vehicle.bodyType}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {vehicle.mileage.toLocaleString()} miles
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {vehicle.transmission}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {vehicle.fuelType}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vehicle.description}
        </p>
        
        <div className="flex justify-between items-center">
          <a
            href={`#vehicle/${vehicle.id}`}
            className="text-red-600 font-medium flex items-center hover:text-red-700 transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
          <button
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;