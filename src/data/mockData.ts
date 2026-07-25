import type { Category, Offer, Provider, RepairRequest } from '../types'

export const categories: Category[] = [
  { id: 'auto', name: 'Car repair', description: 'Diagnostics, brakes, battery, electrical and bodywork.', examples: ['Engine warning light', 'Brake noise', 'Battery issue'], icon: 'Car' },
  { id: 'computer', name: 'Computers & IT', description: 'Laptop, desktop, network, software and data recovery.', examples: ['Laptop will not boot', 'Wi-Fi problems', 'Data recovery'], icon: 'Laptop' },
  { id: 'mobile', name: 'Phones & tablets', description: 'Screen, battery, charging, water damage and software.', examples: ['Broken screen', 'Battery replacement', 'Charging fault'], icon: 'Smartphone' },
  { id: 'appliance', name: 'Home appliances', description: 'Washing machines, refrigerators, ovens and dishwashers.', examples: ['Washer not draining', 'Fridge not cooling', 'Oven fault'], icon: 'WashingMachine' },
  { id: 'home', name: 'Home repair', description: 'Plumbing, electrical, furniture, windows and handyman work.', examples: ['Leaking tap', 'Broken socket', 'Furniture assembly'], icon: 'House' },
  { id: 'property', name: 'Property maintenance', description: 'Heating, painting, roofing, garden and ongoing maintenance.', examples: ['Heating issue', 'Painting work', 'Roof leak'], icon: 'Building2' },
]

export const providers: Provider[] = [
  { id: 'p1', name: 'Riga Mobile Lab', categoryIds: ['mobile'], rating: 4.9, reviewCount: 184, distanceKm: 2.4, eta: 'Today, 16:30', verified: true, description: 'Same-day phone and tablet repairs with clear diagnostics before work begins.', specialties: ['Screens', 'Batteries', 'Charging ports'], startingPrice: 35, completedJobs: 641, responseTime: 'Usually 8 min' },
  { id: 'p2', name: 'TechRescue Riga', categoryIds: ['computer', 'mobile'], rating: 4.8, reviewCount: 126, distanceKm: 4.1, eta: 'Today, 18:00', verified: true, description: 'On-site and workshop IT repairs for individuals and small businesses.', specialties: ['Windows', 'Hardware', 'Networks'], startingPrice: 30, completedJobs: 488, responseTime: 'Usually 12 min' },
  { id: 'p3', name: 'AutoFix Daugava', categoryIds: ['auto'], rating: 4.7, reviewCount: 302, distanceKm: 5.8, eta: 'Tomorrow, 09:00', verified: true, description: 'Independent automotive workshop focused on transparent diagnostics and practical repairs.', specialties: ['Diagnostics', 'Brakes', 'Electrical'], startingPrice: 45, completedJobs: 1190, responseTime: 'Usually 18 min' },
  { id: 'p4', name: 'HomeCare Pro', categoryIds: ['home', 'property'], rating: 4.9, reviewCount: 91, distanceKm: 3.2, eta: 'Today, 17:15', verified: true, description: 'Insured handyman and property maintenance team serving Riga and nearby areas.', specialties: ['Plumbing', 'Electrical', 'Furniture'], startingPrice: 40, completedJobs: 354, responseTime: 'Usually 10 min' },
  { id: 'p5', name: 'Appliance Medic', categoryIds: ['appliance'], rating: 4.6, reviewCount: 78, distanceKm: 7.4, eta: 'Tomorrow, 11:30', verified: false, description: 'Diagnosis and repair of common household appliances at the customer location.', specialties: ['Washers', 'Dishwashers', 'Ovens'], startingPrice: 38, completedJobs: 279, responseTime: 'Usually 24 min' },
  { id: 'p6', name: 'Baltic Property Works', categoryIds: ['home', 'property'], rating: 4.8, reviewCount: 147, distanceKm: 8.3, eta: 'Within 48 hours', verified: true, description: 'Maintenance and renovation specialists for apartments, offices and rental properties.', specialties: ['Painting', 'Heating', 'Renovation'], startingPrice: 55, completedJobs: 512, responseTime: 'Usually 20 min' },
]

export const offers: Offer[] = [
  { id: 'o1', providerId: 'p1', price: 69, arrival: 'Today, 16:30', message: 'Screen inspection is free. Final price confirmed before repair.', warranty: '6-month warranty' },
  { id: 'o2', providerId: 'p2', price: 59, arrival: 'Today, 18:00', message: 'Can collect the device in Riga centre and return it after repair.', warranty: '3-month warranty' },
  { id: 'o3', providerId: 'p4', price: 85, arrival: 'Tomorrow, 10:00', message: 'Includes call-out, diagnosis and the first hour of labour.', warranty: 'Workmanship guarantee' },
]

export const initialRequests: RepairRequest[] = [
  { id: 'req-demo', categoryId: 'mobile', title: 'iPhone screen is cracked', description: 'Touch still works, but the glass is damaged across the lower half.', location: 'Riga, Centre', urgency: 'Within 48 hours', budget: '€50–150', createdAt: new Date().toISOString(), status: 'offers_received', offerIds: ['o1', 'o2'] },
]
