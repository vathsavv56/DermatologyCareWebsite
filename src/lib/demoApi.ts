// Mock API for demo purposes (works without MongoDB)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mock data
const mockHospitals = [
  {
    _id: '1',
    name: 'Apollo Dermatology Center',
    address: '15 MG Road, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110001',
    rating: 4.8,
    doctorCount: 18,
    specialties: ['General Dermatology', 'Cosmetic Procedures', 'Skin Cancer Treatment'],
    phone: '011-2345-6789',
    website: 'apollo-derm.in',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    _id: '2',
    name: 'Fortis Skin Institute',
    address: '45 Vasant Kunj',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110070',
    rating: 4.7,
    doctorCount: 22,
    specialties: ['Dermatology', 'Hair Transplant', 'Laser Treatment'],
    phone: '011-2345-6790',
    website: 'fortis-skin.in',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    _id: '3',
    name: 'Max Super Speciality Dermatology',
    address: '2, Press Enclave Road, Saket',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110017',
    rating: 4.6,
    doctorCount: 15,
    specialties: ['Pediatric Dermatology', 'Allergy Treatment', 'Psoriasis Care'],
    phone: '011-2345-6791',
    website: 'maxhealthcare.in',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  }
];

const mockDoctors = [
  {
    _id: 'd1',
    hospitalId: '1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'General Dermatology',
    experience: 15,
    rating: 4.8,
    status: 'Available',
    hours: '09:00-17:00',
    expertise: ['Acne Treatment', 'Skin Cancer Screening', 'Psoriasis Treatment'],
    education: 'MD Dermatology, AIIMS Delhi',
    consultationFee: { inPerson: 1500, telemedicine: 800 },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    _id: 'd2',
    hospitalId: '1',
    name: 'Dr. Priya Singh',
    specialty: 'Cosmetic Dermatology',
    experience: 12,
    rating: 4.9,
    status: 'Available',
    hours: '10:00-18:00',
    expertise: ['Botox', 'Chemical Peels', 'Laser Hair Removal'],
    education: 'MD Dermatology, PGIMER Chandigarh',
    consultationFee: { inPerson: 2000, telemedicine: 1000 },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    _id: 'd3',
    hospitalId: '2',
    name: 'Dr. Arjun Patel',
    specialty: 'Pediatric Dermatology',
    experience: 10,
    rating: 4.7,
    status: 'Busy',
    hours: '09:00-16:00',
    expertise: ['Eczema in Children', 'Birthmarks', 'Pediatric Acne'],
    education: 'MD Dermatology, KEM Hospital Mumbai',
    consultationFee: { inPerson: 1200, telemedicine: 600 },
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  }
];

class DemoApiService {
  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Hospital APIs
  async searchHospitals(query: string = '', limit: number = 10) {
    await this.delay(800); // Simulate network delay
    
    let filtered = mockHospitals;
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = mockHospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(lowerQuery) ||
        hospital.city.toLowerCase().includes(lowerQuery) ||
        hospital.specialties.some(specialty => specialty.toLowerCase().includes(lowerQuery))
      );
    }
    
    return filtered.slice(0, limit);
  }

  async getHospitalById(id: string) {
    await this.delay(500);
    const hospital = mockHospitals.find(h => h._id === id);
    if (!hospital) throw new Error('Hospital not found');
    return hospital;
  }

  // Doctor APIs
  async getDoctorsByHospital(hospitalId: string) {
    await this.delay(600);
    return mockDoctors.filter(doctor => doctor.hospitalId === hospitalId);
  }

  async getDoctorById(id: string) {
    await this.delay(500);
    const doctor = mockDoctors.find(d => d._id === id);
    if (!doctor) throw new Error('Doctor not found');
    return doctor;
  }

  async searchDoctors(query: string = '', limit: number = 10) {
    await this.delay(700);
    
    let filtered = mockDoctors;
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = mockDoctors.filter(doctor => 
        doctor.name.toLowerCase().includes(lowerQuery) ||
        doctor.specialty.toLowerCase().includes(lowerQuery) ||
        doctor.expertise.some(exp => exp.toLowerCase().includes(lowerQuery))
      );
    }
    
    return filtered.slice(0, limit);
  }

  // Appointment APIs
  async createAppointment(appointmentData: any) {
    await this.delay(1000);
    
    const appointment = {
      _id: `apt_${Date.now()}`,
      ...appointmentData,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store in localStorage for demo
    const appointments = JSON.parse(localStorage.getItem('demoAppointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('demoAppointments', JSON.stringify(appointments));
    
    return appointment;
  }

  async getAppointmentsByEmail(email: string) {
    await this.delay(600);
    
    const appointments = JSON.parse(localStorage.getItem('demoAppointments') || '[]');
    return appointments.filter((apt: any) => apt.patientEmail === email);
  }

  async getAppointmentById(id: string) {
    await this.delay(500);
    
    const appointments = JSON.parse(localStorage.getItem('demoAppointments') || '[]');
    const appointment = appointments.find((apt: any) => apt._id === id);
    if (!appointment) throw new Error('Appointment not found');
    return appointment;
  }

  async updateAppointmentStatus(id: string, status: string) {
    await this.delay(800);
    
    const appointments = JSON.parse(localStorage.getItem('demoAppointments') || '[]');
    const appointmentIndex = appointments.findIndex((apt: any) => apt._id === id);
    
    if (appointmentIndex === -1) throw new Error('Appointment not found');
    
    appointments[appointmentIndex].status = status;
    appointments[appointmentIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem('demoAppointments', JSON.stringify(appointments));
    
    return appointments[appointmentIndex];
  }

  // Health check
  async healthCheck() {
    await this.delay(200);
    return {
      success: true,
      message: 'DermaCare Demo API is running',
      timestamp: new Date().toISOString(),
      mode: 'demo'
    };
  }
}

// Export singleton instance
export const apiService = new DemoApiService();

// Export types for compatibility
export interface Hospital {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  rating: number;
  doctorCount: number;
  specialties: string[];
  phone?: string;
  website?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  _id: string;
  hospitalId: string | Hospital;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  status: string;
  hours: string;
  expertise: string[];
  education?: string;
  image?: string;
  consultationFee?: {
    inPerson: number;
    telemedicine: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  _id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string | Doctor;
  hospitalId: string | Hospital;
  appointmentDate: string;
  timeSlot: string;
  type: 'in-person' | 'telemedicine';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  reason?: string;
  notes?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}