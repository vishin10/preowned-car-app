export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  color: string;
  images: string[];
  features: string[];
  description: string;
  condition: 'new' | 'used';
  bodyType: string;
  sold: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export type VehicleFilters = {
  make: string[];
  bodyType: string[];
  priceRange: [number, number];
  yearRange: [number, number];
  condition: ('new' | 'used' | '')[];
  transmission: string[];
  fuelType: string[];
};