import type { ScheduleData } from '../types/index'

export function getScheduleData(): ScheduleData[] {
  // In a real implementation, this would connect to your actual scheduling system
  // For now, we'll return mock data that represents typical availability
  
  const today = new Date()
  const scheduleData: ScheduleData[] = []
  
  // Generate next 14 days of schedule data
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip Sundays (day 0)
    if (date.getDay() === 0) continue
    
    const dateString = date.toISOString().split('T')[0]
    const dayOfWeek = date.getDay()
    
    // Mock availability based on day patterns
    let availability: 'available' | 'busy' | 'booked'
    let area = ''
    let notes = ''
    
    if (dayOfWeek === 6) { // Saturday
      availability = i < 7 ? 'booked' : 'available'
      area = 'Bath area'
      notes = 'Saturday slots available for larger jobs'
    } else if (i < 3) {
      // Next 3 weekdays are typically busy
      availability = 'busy'
      area = getAreaForDay(dayOfWeek)
      notes = 'Limited availability'
    } else {
      availability = 'available'
      area = getAreaForDay(dayOfWeek)
    }
    
    scheduleData.push({
      date: dateString,
      area,
      availability,
      notes
    })
  }
  
  return scheduleData
}

function getAreaForDay(dayOfWeek: number): string {
  // Mock area rotation based on day of week
  const areaRotation = [
    '', // Sunday (not used)
    'Bath & Keynsham area', // Monday
    'Bristol area', // Tuesday  
    'Paulton & Midsomer Norton area', // Wednesday
    'Radstock & Peasedown area', // Thursday
    'Chew Valley area', // Friday
    'Bath area' // Saturday
  ]
  
  return areaRotation[dayOfWeek] || 'Various areas'
}

export function getAvailabilityForArea(area: string, days: number = 7): ScheduleData[] {
  const scheduleData = getScheduleData()
  
  return scheduleData
    .filter(schedule => 
      schedule.area.toLowerCase().includes(area.toLowerCase()) &&
      schedule.availability === 'available'
    )
    .slice(0, days)
}

export function getNextAvailableDate(): string | null {
  const scheduleData = getScheduleData()
  const nextAvailable = scheduleData.find(schedule => schedule.availability === 'available')
  
  return nextAvailable ? nextAvailable.date : null
}

export function formatDateForCustomer(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  
  return date.toLocaleDateString('en-GB', options)
}