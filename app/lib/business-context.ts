import type { SomersetBusinessContext } from '../types/index'

export function getSomersetBusinessContext(): SomersetBusinessContext {
  return {
    serviceAreas: [
      'Bath',
      'Bristol', 
      'Keynsham',
      'Saltford',
      'Paulton',
      'Midsomer Norton',
      'Radstock',
      'Peasedown St John',
      'Timsbury',
      'Farmborough',
      'High Littleton',
      'Clutton',
      'Temple Cloud',
      'Chew Valley',
      'Pensford',
      'Whitchurch',
      'Compton Dando',
      'Marksbury'
    ],
    services: [
      {
        name: 'Window Cleaning',
        description: 'Professional exterior and interior window cleaning for residential and commercial properties'
      },
      {
        name: 'Gutter Cleaning', 
        description: 'Complete gutter cleaning and maintenance service'
      },
      {
        name: 'Pressure Washing',
        description: 'High-pressure cleaning for driveways, patios, decking, and building exteriors'
      },
      {
        name: 'Conservatory Cleaning',
        description: 'Specialist cleaning for conservatory roofs and windows'
      },
      {
        name: 'Solar Panel Cleaning',
        description: 'Safe and effective solar panel cleaning to maintain efficiency'
      },
      {
        name: 'Commercial Window Cleaning',
        description: 'Regular contract cleaning for offices, shops, and commercial buildings'
      }
    ],
    availability: {
      generalAvailability: 'We typically work Monday to Friday, 8am-5pm, with some Saturday availability for larger jobs',
      specialNotes: 'Weather dependent - we may reschedule during heavy rain or high winds for safety'
    },
    contactInfo: {
      phone: '07123 456789', // Replace with actual phone number
      email: 'info@somersetwindowcleaning.co.uk',
      website: 'www.somersetwindowcleaning.co.uk'
    },
    policies: {
      paymentMethods: ['Cash', 'Bank Transfer', 'Card Payment'],
      cancellationPolicy: '24 hours notice required for cancellations',
      weatherPolicy: 'Services may be rescheduled due to adverse weather conditions for safety reasons'
    }
  }
}

export function getServiceAreaDetails(area: string) {
  const businessContext = getSomersetBusinessContext()
  
  if (businessContext.serviceAreas.includes(area)) {
    return {
      covered: true,
      notes: `We provide regular service to ${area} and surrounding areas`
    }
  }
  
  // Check if it's close to a covered area
  const nearbyAreas = businessContext.serviceAreas.filter(serviceArea => 
    area.toLowerCase().includes(serviceArea.toLowerCase()) ||
    serviceArea.toLowerCase().includes(area.toLowerCase())
  )
  
  if (nearbyAreas.length > 0) {
    return {
      covered: true,
      notes: `${area} is covered as part of our ${nearbyAreas[0]} service area`
    }
  }
  
  return {
    covered: false,
    notes: `${area} is outside our current service areas. Please contact us to discuss special arrangements`
  }
}

export function getServiceDetails(serviceName: string) {
  const businessContext = getSomersetBusinessContext()
  
  return businessContext.services.find(service => 
    service.name.toLowerCase().includes(serviceName.toLowerCase())
  ) || null
}