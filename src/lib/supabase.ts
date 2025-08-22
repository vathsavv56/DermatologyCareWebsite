import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-ref.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

// Create Supabase client with fallback values
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if environment variables are properly configured
const isConfigured = supabaseUrl !== 'https://your-project-ref.supabase.co' && 
                    supabaseAnonKey !== 'your-anon-key-here' &&
                    supabaseUrl && supabaseAnonKey

// Database types
export interface Hospital {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip_code: string
  rating: number
  doctor_count: number
  specialties: string[]
  phone?: string
  website?: string
  created_at: string
}

export interface Doctor {
  id: string
  hospital_id: string
  name: string
  specialty: string
  experience: number
  rating: number
  status: string
  hours: string
  expertise: string[]
  created_at: string
}

// Hospital search function
export async function searchHospitals(query: string = '', limit: number = 10) {
  // If Supabase is not configured, return mock data
  if (!isConfigured) {
    console.warn('Supabase not configured, using mock data')
    return getMockHospitals()
  }

  try {
    let supabaseQuery = supabase
      .from('hospitals')
      .select('*')

    // If there's a search query, apply filters
    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(`
        name.ilike.%${query}%,
        city.ilike.%${query}%,
        state.ilike.%${query}%,
        address.ilike.%${query}%,
        specialties.cs.{${query}}
      `)
    }

    const { data, error } = await supabaseQuery.limit(limit)

    if (error) {
      console.error('Error fetching hospitals:', error)
      return []
    }

    // Randomize and limit results to 7-10 hospitals
    const shuffled = data?.sort(() => 0.5 - Math.random()) || []
    const randomCount = Math.floor(Math.random() * 4) + 7 // Random number between 7-10
    
    return shuffled.slice(0, randomCount)
  } catch (error) {
    console.error('Error in searchHospitals:', error)
    return []
  }
}

// Get doctors for a specific hospital
export async function getDoctorsByHospital(hospitalId: string) {
  // If Supabase is not configured, return mock data
  if (!isConfigured) {
    console.warn('Supabase not configured, using mock doctors')
    return getMockDoctors()
  }

  try {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('hospital_id', hospitalId)
      .order('rating', { ascending: false })

    if (error) {
      console.error('Error fetching doctors:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getDoctorsByHospital:', error)
    return []
  }
}

// Get hospital by ID
export async function getHospitalById(hospitalId: string) {
  // If Supabase is not configured, return mock data
  if (!isConfigured) {
    console.warn('Supabase not configured, using mock hospital')
    return getMockHospitalById(hospitalId)
  }

  try {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .eq('id', hospitalId)
      .single()

    if (error) {
      console.error('Error fetching hospital:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getHospitalById:', error)
    return null
  }
}

// Mock data functions for when Supabase is not configured
function getMockHospitals() {
  const mockHospitals = [
    {
      id: '1',
      name: 'Apollo Dermatology Center',
      address: '15 MG Road, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      zip_code: '110001',
      rating: 4.8,
      doctor_count: 18,
      specialties: ['General Dermatology', 'Cosmetic Procedures', 'Skin Cancer Treatment'],
      phone: '011-2345-6789',
      website: 'apollo-derm.in',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Fortis Skin Institute',
      address: '45 Vasant Kunj',
      city: 'New Delhi',
      state: 'Delhi',
      zip_code: '110070',
      rating: 4.7,
      doctor_count: 22,
      specialties: ['Advanced Dermatology', 'Laser Treatments', 'Hair Transplant'],
      phone: '011-3456-7890',
      website: 'fortis-skin.in',
      created_at: new Date().toISOString()
    }
  ]
  
  // Return random 7-10 hospitals
  const randomCount = Math.floor(Math.random() * 4) + 7
  return mockHospitals.slice(0, randomCount)
}

function getMockDoctors() {
  return [
    {
      id: '1',
      hospital_id: '1',
      name: 'Dr. Rajesh Sharma',
      specialty: 'General Dermatology',
      experience: 15,
      rating: 4.8,
      status: 'Available',
      hours: '09:00-17:00',
      expertise: ['Acne Treatment', 'Skin Cancer Screening', 'Psoriasis Treatment'],
      created_at: new Date().toISOString()
    }
  ]
}

function getMockHospitalById(hospitalId: string) {
  return {
    id: hospitalId,
    name: 'Apollo Dermatology Center',
    address: '15 MG Road, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    zip_code: '110001',
    rating: 4.8,
    doctor_count: 18,
    specialties: ['General Dermatology', 'Cosmetic Procedures', 'Skin Cancer Treatment'],
    phone: '011-2345-6789',
    website: 'apollo-derm.in',
    created_at: new Date().toISOString()
  }
}