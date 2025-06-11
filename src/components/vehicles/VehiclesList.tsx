import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import {  getFilterOptions } from '../../data/vehicles';
import { Vehicle, VehicleFilters } from '../../types';
import Container from '../ui/Container';
import VehicleCard from './VehicleCard';
import Button from '../ui/Button';
import { db } from '../../firebase'; // Adjust path based on your setup
import { collection, getDocs } from 'firebase/firestore';
import VehicleDetailsModal from '../vehicles/VehicleDetailsModal';
import { deleteDoc, doc } from 'firebase/firestore';



const VehiclesList: React.FC = () => {



const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

const [visibleCount, setVisibleCount] = useState(6);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
 const [filters, setFilters] = useState<VehicleFilters>({
  make: [],
  bodyType: [],
  transmission: [],
  fuelType: [],
  priceRange: [0, 100000], // ← temporary default
  yearRange: [1990, new Date().getFullYear()],
});

  // Utility to extract unique values from vehicle list
const uniqueValues = (list: Vehicle[], key: keyof Vehicle): string[] =>
  Array.from(new Set(list.map(v => v[key]).filter(Boolean))) as string[];

// Utility to calculate min and max of a number array
const getMinMax = (arr: number[]): [number, number] => {
  const nums = arr.filter(v => !isNaN(v)).sort((a, b) => a - b);
  return nums.length ? [nums[0], nums[nums.length - 1]] : [0, 100000];
};

// ✅ Dynamic filter options based on all loaded vehicles
const filterOptions = {
  makes: uniqueValues(allVehicles, "make"),
  bodyTypes: uniqueValues(allVehicles, "bodyType"),
  transmissions: uniqueValues(allVehicles, "transmission"),
  fuelTypes: uniqueValues(allVehicles, "fuelType"),
  priceRange: getMinMax(allVehicles.map(v => Number(v.price))),
  yearRange: getMinMax(allVehicles.map(v => Number(v.year))),
};



useEffect(() => {
  const fetchVehicles = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'vehicles'));
      const data = snapshot.docs.map(doc => {
        const raw = doc.data();
        return {
          id: doc.id,
          ...raw,
          images: raw.images || (raw.imageUrl ? [raw.imageUrl] : []), 
          price: Number(raw.price),
          year: Number(raw.year),
        };
      }) as Vehicle[];

      setAllVehicles(data);
      setFilteredVehicles(data);
    } catch (err) {
      console.error("❌ Error loading vehicles:", err);
    }
  };

  fetchVehicles();
}, []);


useEffect(() => {
  if (allVehicles.length === 0) return;

  let results = [...allVehicles];

  console.log("🐞 All Vehicles Before Filtering:", allVehicles);
  console.log("🧪 Filters:", filters);

  // 🔍 Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    results = results.filter(vehicle =>
      (vehicle.make?.toLowerCase() || '').includes(term) ||
      (vehicle.model?.toLowerCase() || '').includes(term) ||
      `${vehicle.year}`.includes(term) ||
      (vehicle.bodyType?.toLowerCase() || '').includes(term)
    );
  }

  // ✅ Checkbox filters (only if selected)
 if (filters.make.length > 0) {
  results = results.filter(vehicle =>
    filters.make.includes((vehicle.make || '').toLowerCase())
  );
}


   if (filters.bodyType.length > 0) {
    const selected = filters.bodyType.map(b => b.toLowerCase());
    results = results.filter(vehicle =>
      selected.includes(vehicle.bodyType?.toLowerCase())
    );
  }

  if (filters.transmission.length > 0) {
    results = results.filter(vehicle =>
      filters.transmission.includes(vehicle.transmission?.toLowerCase()?.trim())
    );
  }

 if (filters.fuelType.length > 0) {
    const selected = filters.fuelType.map(f => f.toLowerCase());
    results = results.filter(vehicle =>
      selected.includes(vehicle.fuelType?.toLowerCase())
    );
  }

  // 💰 Only filter by price range if user changed it
  if (
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== Infinity
  ) {
    results = results.filter(vehicle =>
      typeof vehicle.price === 'number' &&
      vehicle.price >= filters.priceRange[0] &&
      vehicle.price <= filters.priceRange[1]
    );
  }

  // 📆 Year range filter
  if (
    filters.yearRange[0] !== 0 || filters.yearRange[1] !== Infinity
  ) {
    results = results.filter(vehicle =>
      typeof vehicle.year === 'number' &&
      vehicle.year >= filters.yearRange[0] &&
      vehicle.year <= filters.yearRange[1]
    );
  }

  console.log("✅ Final filtered results:", results.length);
  setFilteredVehicles(results);
}, [allVehicles, searchTerm, filters]);


useEffect(() => {
  const deleteOldSoldVehicles = async () => {
    const now = Date.now();

    for (const vehicle of allVehicles) {
      if (
        vehicle.sold &&
        vehicle.soldAt?.toDate &&
        vehicle.soldAt.toDate() <= new Date(now - 2 * 24 * 60 * 60 * 1000)
      ) {
        try {
          await deleteDoc(doc(db, 'vehicles', vehicle.id));
          console.log("🗑️ Deleted sold vehicle:", vehicle.id);
        } catch (err) {
          console.error("Failed to delete sold vehicle:", err);
        }
      }
    }
  };

  deleteOldSoldVehicles();
}, [allVehicles]);



// ✅ added allVehicles to dependencies

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCheckboxChange = (
    category: keyof VehicleFilters,
    value: string
  ) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[category] as string[];
      
      if (currentValues.includes(value)) {
        return {
          ...prevFilters,
          [category]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...currentValues, value]
        };
      }
    });
  };
 const resetFilters = () => {
  setFilters({
    make: [],
    bodyType: [],
    transmission: [],
    fuelType: [],
    priceRange: [0, Infinity],
    yearRange: [0, Infinity],
  });
  setSearchTerm('');
};

  
  const activeFiltersCount = (
    filters.make.length +
    filters.bodyType.length +
    filters.transmission.length +
    filters.fuelType.length +
    (filters.priceRange[0] !== filterOptions.priceRange[0] || 
     filters.priceRange[1] !== filterOptions.priceRange[1] ? 1 : 0) +
    (filters.yearRange[0] !== filterOptions.yearRange[0] || 
     filters.yearRange[1] !== filterOptions.yearRange[1] ? 1 : 0)
  );
  console.log("✅ Rendering VehiclesList with", filteredVehicles.length, "vehicles");


  if (!allVehicles || allVehicles.length === 0) {
  return (
    <section className="py-20 text-center">
      <h2 className="text-xl font-semibold text-gray-700">Loading vehicles...</h2>
    </section>
  );
}

  return (
    <section className="py-16 bg-gray-50" id="vehicles">
      <Container>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Our Vehicles</h2>
            <p className="text-gray-600">
              Discover our selection of premium vehicles to find your perfect match.
            </p>
          </div>
          <div className="hidden md:block">
     <p className="text-gray-600">
  Showing <span className="font-semibold">{Math.min(visibleCount, filteredVehicles.length)}</span> of <span className="font-semibold">{filteredVehicles.length}</span> vehicles
</p>

          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Search and Filter UI */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <button
                onClick={toggleFilter}
                className="w-full flex items-center justify-between bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors lg:hidden"
              >
                <span className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isFilterOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </button>
                  )}
                </div>
                
                {/* Make Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Make</h4>
                  <div className="space-y-2">
                    {filterOptions.makes.map(make => (
                      <label key={make} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.make.includes(make)}
onChange={() => handleCheckboxChange('make', make.toLowerCase())}
                          className="rounded text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="text-gray-700">{make}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Body Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Body Type</h4>
                  <div className="space-y-2">
                    {filterOptions.bodyTypes.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.bodyType.includes(type)}
                          onChange={() => handleCheckboxChange('bodyType', type)}
                          className="rounded text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Price Range Filter */}
<div className="mb-6">
  <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
  <div className="flex gap-2 items-center">
    <input
      type="number"
      value={filters.priceRange[0]}
      min={filterOptions.priceRange[0]}
      max={filterOptions.priceRange[1]}
      onChange={e =>
        setFilters(prev => ({ ...prev, priceRange: [Number(e.target.value), prev.priceRange[1]] }))
      }
      className="w-20 border rounded px-2 py-1"
    />
    <span>to</span>
    <input
      type="number"
      value={filters.priceRange[1]}
      min={filterOptions.priceRange[0]}
      max={filterOptions.priceRange[1]}
      onChange={e =>
        setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))
      }
      className="w-20 border rounded px-2 py-1"
    />
  </div>
</div>

{/* Year Range Filter */}
<div className="mb-6">
  <h4 className="font-medium text-gray-900 mb-2">Year Range</h4>
  <div className="flex gap-2 items-center">
    <input
      type="number"
      value={filters.yearRange[0]}
      min={filterOptions.yearRange[0]}
      max={filterOptions.yearRange[1]}
      onChange={e =>
        setFilters(prev => ({ ...prev, yearRange: [Number(e.target.value), prev.yearRange[1]] }))
      }
      className="w-20 border rounded px-2 py-1"
    />
    <span>to</span>
    <input
      type="number"
      value={filters.yearRange[1]}
      min={filterOptions.yearRange[0]}
      max={filterOptions.yearRange[1]}
      onChange={e =>
        setFilters(prev => ({ ...prev, yearRange: [prev.yearRange[0], Number(e.target.value)] }))
      }
      className="w-20 border rounded px-2 py-1"
    />
  </div>
</div>
                            
                {/* Transmission Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Transmission</h4>
                  <div className="space-y-2">
                    {filterOptions.transmissions.map(transmission => (
                      <label key={transmission} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.transmission.includes(transmission)}
                          onChange={() => handleCheckboxChange('transmission', transmission)}
                          className="rounded text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="text-gray-700">{transmission}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Fuel Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Fuel Type</h4>
                  <div className="space-y-2">
                    {filterOptions.fuelTypes.map(fuelType => (
                      <label key={fuelType} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.fuelType.includes(fuelType)}
                          onChange={() => handleCheckboxChange('fuelType', fuelType)}
                          className="rounded text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="text-gray-700">{fuelType}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle Cards */}
          <div className="lg:w-3/4">
            <div className="mb-4 block md:hidden">
              <p className="text-gray-600">
  Showing <span className="font-semibold">{filteredVehicles.length}</span> of <span className="font-semibold">{allVehicles.length}</span> vehicles
</p>

            </div>
            
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Vehicles Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any vehicles matching your current filters.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.slice(0, visibleCount).map(vehicle => (
  <div
    key={vehicle.id}
    className="p-4 border rounded cursor-pointer"
    onClick={() => setSelectedVehicle(vehicle)}
  >
    <img
      src={vehicle?.images?.[0] || vehicle?.imageUrl || "https://placehold.co/400x300?text=No+Image"}
      alt={`${vehicle?.year ?? ''} ${vehicle?.make ?? ''} ${vehicle?.model ?? ''}`}
      className="w-full h-48 object-cover mb-4 rounded"
    />
    <p><strong>Make:</strong> {vehicle.make}</p>
    <p><strong>Model:</strong> {vehicle.model}</p>
    <p><strong>Year:</strong> {vehicle.year}</p>
    <p><strong>Price:</strong> {vehicle.price}</p>
    <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
  </div>
))}

{selectedVehicle && (
  <VehicleDetailsModal
    vehicle={selectedVehicle}
    onClose={() => setSelectedVehicle(null)}
  />
)}

              </div>
            )}
            
           {visibleCount < filteredVehicles.length && (
  <div className="mt-8 text-center">
    <Button variant="outline" onClick={() => setVisibleCount(prev => prev + 6)}>
      Load More Vehicles
    </Button>
  </div>
)}

          </div>
        </div>
      </Container>
    </section>
  );

};

export default VehiclesList;


