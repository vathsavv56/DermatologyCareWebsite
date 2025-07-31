import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import HospitalSearch from './components/HospitalSearch';
import DoctorList from './components/DoctorList';
import BookingPage from './components/BookingPage';
import SymptomChecker from './components/SymptomChecker';
import ChatSupport from './components/ChatSupport';
import AppointmentManager from './components/AppointmentManager';

interface Hospital {
  name: string;
  address: string;
  rating: number;
  doctorCount: number;
  doctors: string[];
}

interface Doctor {
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  status: string;
  hours: string;
  expertise: string[];
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'telemedicine' | null>(null);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
  };

  const handleBookAppointment = (doctor: Doctor, type: 'in-person' | 'telemedicine') => {
    setSelectedDoctor(doctor);
    setAppointmentType(type);
    setCurrentPage('booking');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'search':
        return (
          <HospitalSearch 
            onSelectHospital={handleSelectHospital}
            onPageChange={handlePageChange}
          />
        );
      case 'doctors':
        return (
          <DoctorList 
            selectedHospital={selectedHospital}
            onBookAppointment={handleBookAppointment}
            onPageChange={handlePageChange}
          />
        );
      case 'booking':
        return (
          <BookingPage 
            selectedDoctor={selectedDoctor}
            appointmentType={appointmentType}
            onPageChange={handlePageChange}
          />
        );
      case 'symptom-checker':
        return <SymptomChecker onPageChange={handlePageChange} />;
      case 'chat':
        return <ChatSupport onPageChange={handlePageChange} />;
      case 'appointments':
        return <AppointmentManager onPageChange={handlePageChange} />;
      case 'profile':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">User Profile</h1>
                <p className="text-gray-600">Profile management features coming soon...</p>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;