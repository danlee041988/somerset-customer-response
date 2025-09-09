export interface CustomerMessage {
  content: string
  customerEmail?: string
  timestamp?: string
}

export interface AIResponse {
  content: string
  confidence: number
  suggestions?: string[]
  businessContext?: {
    serviceAreas?: string[]
    availableDates?: string[]
    suggestedServices?: string[]
  }
}

export interface SomersetBusinessContext {
  serviceAreas: string[]
  services: {
    name: string
    description: string
    pricing?: string
  }[]
  availability: {
    generalAvailability: string
    specialNotes?: string
  }
  contactInfo: {
    phone: string
    email: string
    website: string
  }
  policies: {
    paymentMethods: string[]
    cancellationPolicy: string
    weatherPolicy: string
  }
}

export interface ScheduleData {
  date: string
  area: string
  availability: 'available' | 'busy' | 'booked'
  notes?: string
}

export interface ResponseTemplate {
  id: string
  name: string
  template: string
  variables: string[]
  category: string
}