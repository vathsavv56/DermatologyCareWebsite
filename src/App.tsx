import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import HospitalSearch from './components/HospitalSearch';
import DoctorList from './components/DoctorList';
import BookingPage from './components/BookingPage';
import SymptomChecker from './components/SymptomChecker';
import ChatSupport from './components/ChatSupport';
import AppointmentManager from './components/AppointmentManager';
import { Hospital, Doctor } from './lib/api';

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

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  const renderCurrentPage = () => {
    const pages = {
      'home': <HomePage onPageChange={handlePageChange} />,
      'search': (
        <HospitalSearch 
          onSelectHospital={handleSelectHospital}
          onPageChange={handlePageChange}
        />
      ),
      'doctors': (
        <DoctorList 
          selectedHospital={selectedHospital}
          onBookAppointment={handleBookAppointment}
          onPageChange={handlePageChange}
        />
      ),
      'booking': (
        <BookingPage 
          selectedDoctor={selectedDoctor}
          appointmentType={appointmentType}
          onPageChange={handlePageChange}
        />
      ),
      'symptom-checker': <SymptomChecker onPageChange={handlePageChange} />,
      'chat': <ChatSupport onPageChange={handlePageChange} />,
      'appointments': <AppointmentManager onPageChange={handlePageChange} />
    };

    return pages[currentPage as keyof typeof pages] || pages.home;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>

      {/* Global toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {/* Always show chat support */}
      <ChatSupport onPageChange={handlePageChange} />
    </div>
  );
}

export default App;