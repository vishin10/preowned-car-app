import React from 'react';
import { Vehicle } from '../../types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Props {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleDetailsModal: React.FC<Props> = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-lg">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-500 font-bold text-xl"
        >
          ✕
        </button>

        {/* Vehicle Images Carousel */}
        <div className="mb-4 rounded-lg overflow-hidden">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            swipeable
            dynamicHeight={false}
          >
            {(vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.imageUrl || "https://placehold.co/600x400?text=No+Image"]).map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Vehicle Image ${index + 1}`}
                  className="h-64 object-cover w-full"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Vehicle Info */}
        <h2 className="text-2xl font-bold mb-2">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>

        <ul className="text-gray-700 space-y-1 text-sm sm:text-base">
          <li><strong>Price:</strong> ${vehicle.price}</li>
          <li><strong>Mileage:</strong> {vehicle.mileage} miles</li>
          <li><strong>Fuel Type:</strong> {vehicle.fuelType}</li>
          <li><strong>Transmission:</strong> {vehicle.transmission}</li>
          <li><strong>Body Type:</strong> {vehicle.bodyType}</li>
          <li><strong>Condition:</strong> {vehicle.condition}</li>
          <li><strong>Color:</strong> {vehicle.color}</li>
          <li><strong>Engine:</strong> {vehicle.engineSize}</li>
          <li><strong>Features:</strong> {vehicle.features?.join(', ') || 'None'}</li>
          <li><strong>Description:</strong> {vehicle.description}</li>
        </ul>

        {/* Close Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
          >
            Close Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
