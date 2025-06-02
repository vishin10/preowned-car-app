import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { vehicles, getFilterOptions } from '../../data/vehicles';
import { Vehicle, VehicleFilters } from '../../types';
import Container from '../ui/Container';
import VehicleCard from './VehicleCard';
import Button from '../ui/Button';

const VehiclesList: React.FC = () => {
  const filterOptions = getFilterOptions();
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<VehicleFilters>({
    make: [],
    bodyType: [],
    priceRange: filterOptions.priceRange,
    yearRange: filterOptions.yearRange,
    condition: [],
    transmission: [],
    fuelType: []
  });
  
  // Apply filters when they change
  useEffect(() => {
    let results = vehicles;
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        vehicle => 
          vehicle.make.toLowerCase().includes(term) || 
          vehicle.model.toLowerCase().includes(term) ||
          `${vehicle.year}`.includes(term) ||
          vehicle.bodyType.toLowerCase().includes(term)
      );
    }
    
    // Apply make filter
    if (filters.make.length > 0) {
      results = results.filter(vehicle => filters.make.includes(vehicle.make));
    }
    
    // Apply body type filter
    if (filters.bodyType.length > 0) {
      results = results.filter(vehicle => filters.bodyType.includes(vehicle.bodyType));
    }
    
    // Apply condition filter
    if (filters.condition.length > 0) {
      results = results.filter(vehicle => filters.condition.includes(vehicle.condition));
    }
    
    // Apply transmission filter
    if (filters.transmission.length > 0) {
      results = results.filter(vehicle => filters.transmission.includes(vehicle.transmission));
    }
    
    // Apply fuel type filter
    if (filters.fuelType.length > 0) {
      results = results.filter(vehicle => filters.fuelType.includes(vehicle.fuelType));
    }
    
    // Apply price range filter
    results = results.filter(
      vehicle => 
        vehicle.price >= filters.priceRange[0] && 
        vehicle.price <= filters.priceRange[1]
    );
    
    // Apply year range filter
    results = results.filter(
      vehicle => 
        vehicle.year >= filters.yearRange[0] && 
        vehicle.year <= filters.yearRange[1]
    );
    
    setFilteredVehicles(results);
  }, [searchTerm, filters]);
  
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
      priceRange: filterOptions.priceRange,
      yearRange: filterOptions.yearRange,
      condition: [],
      transmission: [],
      fuelType: []
    });
    setSearchTerm('');
  };
  
  const activeFiltersCount = (
    filters.make.length +
    filters.bodyType.length +
    filters.condition.length +
    filters.transmission.length +
    filters.fuelType.length +
    (filters.priceRange[0] !== filterOptions.priceRange[0] || 
     filters.priceRange[1] !== filterOptions.priceRange[1] ? 1 : 0) +
    (filters.yearRange[0] !== filterOptions.yearRange[0] || 
     filters.yearRange[1] !== filterOptions.yearRange[1] ? 1 : 0)
  );
  
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
              Showing <span className="font-semibold">{filteredVehicles.length}</span> of <span className="font-semibold">{vehicles.length}</span> vehicles
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
                          onChange={() => handleCheckboxChange('make', make)}
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
                
                {/* Condition Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Condition</h4>
                  <div className="space-y-2">
                    {['new', 'used'].map(condition => (
                      <label key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition as 'new' | 'used')}
                          onChange={() => handleCheckboxChange('condition', condition)}
                          className="rounded text-red-600 focus:ring-red-500 mr-2"
                        />
                        <span className="text-gray-700 capitalize">{condition}</span>
                      </label>
                    ))}
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
                Showing <span className="font-semibold">{filteredVehicles.length}</span> of <span className="font-semibold">{vehicles.length}</span> vehicles
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
                {filteredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
            
            {filteredVehicles.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline">
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