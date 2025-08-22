import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Phone, Star, Edit, Trash2 } from 'lucide-react';

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: 'in-person' | 'telemedicine';
  status: 'upcoming' | 'completed' | 'cancelled';
  hospital: string;
  address: string;
  rating?: number;
}

interface AppointmentManagerProps {
  onPageChange: (page: string) => void;
}

const AppointmentManager: React.FC<AppointmentManagerProps> = ({ onPageChange }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cosmetic Dermatology',
      date: '2024-12-30',
      time: '10:00 AM',
      type: 'in-person',
      status: 'upcoming',
      hospital: 'Metro Dermatology Center',
      address: '123 Main St, Downtown'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Medical Dermatology',
      date: '2024-12-15',
      time: '2:00 PM',
      type: 'telemedicine',
      status: 'completed',
      hospital: 'Metro Dermatology Center',
      address: '123 Main St, Downtown',
      rating: 5
    },
    {
      id: 3,
      doctor: 'Dr. James Wilson',
      specialty: 'Surgical Dermatology',
      date: '2024-12-28',
      time: '9:00 AM',
      type: 'in-person',
      status: 'upcoming',
      hospital: 'City Skin Clinic',
      address: '456 Oak Avenue, Midtown'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');

  const filteredAppointments = appointments.filter(apt => 
    activeTab === 'all' || apt.status === activeTab
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
  };

  const handleRateAppointment = (id: number, rating: number) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, rating } : apt
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p className="text-gray-600">Manage your dermatology appointments and consultations</p>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-gray-600">Book new appointments or manage existing ones</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onPageChange('search')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Book New Appointment
              </button>
              <button
                onClick={() => onPageChange('symptom-checker')}
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Check Symptoms
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-md">
          {[
            { key: 'upcoming', label: 'Upcoming', count: appointments.filter(a => a.status === 'upcoming').length },
            { key: 'completed', label: 'Completed', count: appointments.filter(a => a.status === 'completed').length },
            { key: 'all', label: 'All', count: appointments.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'upcoming' | 'completed' | 'all')}
              className={`flex-1 px-4 py-3 rounded-md font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{appointment.doctor}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">{appointment.specialty}</p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{appointment.hospital}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{appointment.address}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{appointment.time}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      {appointment.type === 'telemedicine' ? (
                        <Video className="w-4 h-4 text-green-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-blue-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        appointment.type === 'telemedicine' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {appointment.type === 'telemedicine' ? 'Video Consultation' : 'In-Person Visit'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating Section for Completed Appointments */}
                {appointment.status === 'completed' && (
                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Rate your experience:</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRateAppointment(appointment.id, star)}
                            className={`w-6 h-6 ${
                              (appointment.rating && star <= appointment.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-400'
                            } transition-colors`}
                          >
                            <Star className="w-full h-full fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-3">
                    {appointment.status === 'upcoming' && (
                      <>
                        {appointment.type === 'telemedicine' && (
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                            <Video className="w-4 h-4 inline mr-2" />
                            Join Video Call
                          </button>
                        )}
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                          <Edit className="w-4 h-4 inline mr-2" />
                          Reschedule
                        </button>
                      </>
                    )}
                    
                    {appointment.status === 'completed' && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        Book Follow-up
                      </button>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-600 p-2">
                      <Phone className="w-4 h-4" />
                    </button>
                    {appointment.status === 'upcoming' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="text-gray-500 hover:text-red-600 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No {activeTab !== 'all' ? activeTab : ''} appointments
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming appointments scheduled."
                : activeTab === 'completed'
                ? "No completed appointments to show."
                : "You haven't scheduled any appointments yet."
              }
            </p>
            <button
              onClick={() => onPageChange('search')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book Your First Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManager;