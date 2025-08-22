const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async fetchWithErrorHandling(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error(`API Error for ${url}:`, error);
      throw error;
    }
  }

  // Hospital APIs
  async searchHospitals(query: string = '', limit: number = 10) {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    params.append('limit', limit.toString());

    const response = await this.fetchWithErrorHandling(
      `/hospitals?${params.toString()}`
    );
    return response.data;
  }

  async getHospitalById(id: string) {
    const response = await this.fetchWithErrorHandling(`/hospitals/${id}`);
    return response.data;
  }

  // Doctor APIs
  async getDoctorsByHospital(hospitalId: string) {
    const params = new URLSearchParams({ hospitalId });
    const response = await this.fetchWithErrorHandling(
      `/doctors?${params.toString()}`
    );
    return response.data;
  }

  async getDoctorById(id: string) {
    const response = await this.fetchWithErrorHandling(`/doctors/${id}`);
    return response.data;
  }

  async searchDoctors(query: string = '', limit: number = 10) {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    params.append('limit', limit.toString());

    const response = await this.fetchWithErrorHandling(
      `/doctors?${params.toString()}`
    );
    return response.data;
  }

  // Appointment APIs
  async createAppointment(appointmentData: any) {
    const response = await this.fetchWithErrorHandling('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
    return response.data;
  }

  async getAppointmentsByEmail(email: string) {
    const params = new URLSearchParams({ patientEmail: email });
    const response = await this.fetchWithErrorHandling(
      `/appointments?${params.toString()}`
    );
    return response.data;
  }

  async getAppointmentById(id: string) {
    const response = await this.fetchWithErrorHandling(`/appointments/${id}`);
    return response.data;
  }

  async updateAppointmentStatus(id: string, status: string) {
    const response = await this.fetchWithErrorHandling(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return response.data;
  }

  // Health check
  async healthCheck() {
    const response = await this.fetchWithErrorHandling('/health');
    return response;
  }
}

// Export singleton instance
export const apiService = new ApiService();

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