import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

    const { data, error } = await supabaseQuery.limit(500) // Get more records to randomize

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