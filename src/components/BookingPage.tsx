import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

interface Doctor {
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  status: string;
  hours: string;
  expertise: string[];
}

interface BookingPageProps {
  selectedDoctor: Doctor | null;
  appointmentType: 'in-person' | 'telemedicine' | null;
  onPageChange: (page: string) => void;
}

const BookingPage: React.FC<BookingPageProps> = ({ selectedDoctor, appointmentType, onPageChange }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    symptoms: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  const availableDates = getNextWeekDates();
  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  function getNextWeekDates() {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking
    setIsBooked(true);
    
    // Reset form after 3 seconds and redirect
    setTimeout(() => {
      setIsBooked(false);
      onPageChange('appointments');
    }, 3000);
  };

  if (!selectedDoctor || !appointmentType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No doctor or appointment type selected</p>
          <button
            onClick={() => onPageChange('search')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Find Doctors
          </button>
        </div>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your {appointmentType === 'telemedicine' ? 'video consultation' : 'in-person appointment'} with {selectedDoctor.name} has been scheduled.
          </p>
          <p className="text-sm text-gray-500">Redirecting to your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onPageChange('doctors')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Doctors
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Book Appointment</h1>
            <div className="flex items-center space-x-4">
              <div>
                <p className="font-medium">{selectedDoctor.name}</p>
                <p className="text-blue-100">{selectedDoctor.specialty}</p>
              </div>
              <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                {appointmentType === 'telemedicine' ? 'Video Consultation' : 'In-Person Visit'}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="w-4 h-4 inline mr-2" />
                Select Date
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedDate === date
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Clock className="w-4 h-4 inline mr-2" />
                Select Time
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedTime === time
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                <User className="w-5 h-5 inline mr-2" />
                Patient Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientInfo.name}
                    onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      required
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
                <input
                  type="text"
                  required
                  value={patientInfo.reason}
                  onChange={(e) => setPatientInfo({ ...patientInfo, reason: e.target.value })}
                  placeholder="e.g., Skin consultation, Acne treatment, Mole check"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms/Description</label>
                <textarea
                  rows={4}
                  value={patientInfo.symptoms}
                  onChange={(e) => setPatientInfo({ ...patientInfo, symptoms: e.target.value })}
                  placeholder="Please describe any symptoms or concerns..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Appointment Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Appointment Summary</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Doctor: {selectedDoctor.name}</p>
                <p>Type: {appointmentType === 'telemedicine' ? 'Video Consultation' : 'In-Person Visit'}</p>
                {selectedDate && <p>Date: {new Date(selectedDate).toLocaleDateString()}</p>}
                {selectedTime && <p>Time: {selectedTime}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !patientInfo.name || !patientInfo.email || !patientInfo.phone || !patientInfo.reason}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;