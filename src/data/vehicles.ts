import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'BMW',
    model: '5 Series',
    year: 2023,
    price: 56999,
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engineSize: '2.0L',
    color: 'Alpine White',
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Leather Seats', 
      'Navigation System', 
      'Heated Seats', 
      'Sunroof', 
      'Parking Sensors',
      'Lane Departure Warning',
      'Blind Spot Monitoring'
    ],
    description: 'Experience the ultimate driving machine with this brand new BMW 5 Series. This luxury sedan combines elegant design with cutting-edge technology for an unmatched driving experience.',
    condition: 'new',
    bodyType: 'Sedan',
    sold: false
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2022,
    price: 62500,
    mileage: 12000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engineSize: '3.0L',
    color: 'Obsidian Black',
    images: [
      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Premium Leather', 
      'MBUX Infotainment', 
      'Driver Assistance Package', 
      'Panoramic Sunroof', 
      'Burmester Sound System',
      'Head-Up Display',
      'Wireless Charging'
    ],
    description: 'This stunning Mercedes-Benz E-Class exemplifies German engineering at its finest. With premium materials and advanced technology, it offers both luxury and performance.',
    condition: 'used',
    bodyType: 'Sedan',
    sold: false
  },
  {
    id: '3',
    make: 'Audi',
    model: 'Q7',
    year: 2023,
    price: 71950,
    mileage: 5000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engineSize: '3.0L',
    color: 'Glacier White',
    images: [
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Quattro All-Wheel Drive', 
      'MMI Navigation Plus', 
      'Bang & Olufsen 3D Sound', 
      'Virtual Cockpit', 
      'Adaptive Air Suspension',
      'Matrix LED Headlights',
      'Four-Zone Climate Control'
    ],
    description: 'This luxurious Audi Q7 SUV combines space, comfort and technology in one premium package. With quattro all-wheel drive and advanced safety features, it\'s perfect for families seeking luxury and capability.',
    condition: 'used',
    bodyType: 'SUV',
    sold: false
  },
  {
    id: '4',
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 89990,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    engineSize: 'Dual Motor',
    color: 'Pearl White',
    images: [
      'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/12861516/pexels-photo-12861516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Autopilot', 
      '17" Touchscreen', 
      'Premium Audio System', 
      'Smart Air Suspension', 
      'Over-the-air Updates',
      'Supercharger Access',
      'Glass Roof'
    ],
    description: 'Experience the future of driving with this all-electric Tesla Model S. With instant acceleration, advanced autopilot capabilities, and zero emissions, it\'s the ultimate modern luxury vehicle.',
    condition: 'new',
    bodyType: 'Sedan',
    sold: false
  },
  {
    id: '5',
    make: 'Porsche',
    model: '911 Carrera',
    year: 2022,
    price: 105500,
    mileage: 8500,
    fuelType: 'Gasoline',
    transmission: 'PDK',
    engineSize: '3.0L Twin-Turbo',
    color: 'Racing Yellow',
    images: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3786093/pexels-photo-3786093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Sport Chrono Package', 
      'PASM Sport Suspension', 
      'Sport Exhaust System', 
      'Porsche Communication Management', 
      'Adaptive Sport Seats Plus',
      'BOSE Surround Sound',
      'Rear-Axle Steering'
    ],
    description: 'This iconic Porsche 911 Carrera offers the perfect blend of performance and luxury. With its distinctive styling and precision engineering, it delivers an exhilarating driving experience like no other sports car.',
    condition: 'used',
    bodyType: 'Sports Car',
    sold: false
  },
  {
    id: '6',
    make: 'Land Rover',
    model: 'Range Rover',
    year: 2023,
    price: 98500,
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engineSize: '3.0L',
    color: 'Santorini Black',
    images: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3757046/pexels-photo-3757046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1034656/pexels-photo-1034656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    features: [
      'Terrain Response 2', 
      'Meridian Surround Sound', 
      'Touch Pro Duo', 
      'Windsor Leather Seats', 
      'Pixel LED Headlights',
      'Electronic Air Suspension',
      'Configurable Ambient Lighting'
    ],
    description: 'The ultimate luxury SUV, this Range Rover combines unparalleled off-road capability with sophisticated design and premium comfort. Experience the perfect blend of performance, technology, and refinement.',
    condition: 'new',
    bodyType: 'SUV',
    sold: false
  }
];

export const getFilterOptions = () => {
  const makes = [...new Set(vehicles.map(v => v.make))];
  const bodyTypes = [...new Set(vehicles.map(v => v.bodyType))];
  const transmissions = [...new Set(vehicles.map(v => v.transmission))];
  const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))];
  
  const priceRange: [number, number] = [
    Math.min(...vehicles.map(v => v.price)),
    Math.max(...vehicles.map(v => v.price))
  ];
  
  const yearRange: [number, number] = [
    Math.min(...vehicles.map(v => v.year)),
    Math.max(...vehicles.map(v => v.year))
  ];
  
  return {
    makes,
    bodyTypes,
    transmissions,
    fuelTypes,
    priceRange,
    yearRange
  };
};