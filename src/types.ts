export type CategoryId = 'auto' | 'computer' | 'mobile' | 'appliance' | 'home' | 'property'
export type Urgency = 'Today' | 'Within 48 hours' | 'This week' | 'Flexible'
export type Budget = 'Need estimate' | 'Under €50' | '€50–150' | '€150–400' | '€400+'

export interface Category {
  id: CategoryId
  name: string
  description: string
  examples: string[]
  icon: string
}

export interface Provider {
  id: string
  name: string
  categoryIds: CategoryId[]
  rating: number
  reviewCount: number
  distanceKm: number
  eta: string
  verified: boolean
  description: string
  specialties: string[]
  startingPrice: number
  completedJobs: number
  responseTime: string
}

export interface Offer {
  id: string
  providerId: string
  price: number
  arrival: string
  message: string
  warranty: string
}

export interface RepairRequest {
  id: string
  categoryId: CategoryId
  title: string
  description: string
  location: string
  urgency: Urgency
  budget: Budget
  createdAt: string
  status: 'matching' | 'offers_received' | 'accepted'
  offerIds: string[]
}

export interface WizardDraft {
  categoryId: CategoryId | ''
  title: string
  description: string
  location: string
  urgency: Urgency
  budget: Budget
  photoNames: string[]
}
