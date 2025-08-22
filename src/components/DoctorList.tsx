import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Video, Award, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { apiService, Doctor, Hospital } from '../lib/demoApi';

interface DoctorListProps {
  selectedHospital: Hospital | null;
  onBookAppointment: (doctor: Doctor, type: 'in-person' | 'telemedicine') => void;
  onPageChange: (page: string) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({ selectedHospital, onBookAppointment, onPageChange }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedHospital) {
      loadDoctors();
      // Simulate random availability changes
      const interval = setInterval(() => {
        updateDoctorAvailability();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [selectedHospital]);

  const loadDoctors = async () => {
    if (!selectedHospital?._id) return;
    
    setLoading(true);
    try {
      const doctorData = await apiService.getDoctorsByHospital(selectedHospital._id);
      setDoctors(doctorData);
    } catch (error) {
      console.error('Error loading doctors:', error);
      toast.error('Failed to load doctors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateDoctorAvailability = () => {
    setDoctors(prevDoctors => 
      prevDoctors.map(doctor => ({
        ...doctor,
        status: Math.random() > 0.3 ? 'Available' : 'Busy'
      }))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!selectedHospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No hospital selected</p>
          <button
            onClick={() => onPageChange('search')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search Hospitals
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="flex items-center mb-8">
            <Skeleton circle width={48} height={48} className="mr-4" />
            <div>
              <Skeleton height={32} width={300} className="mb-2" />
              <Skeleton height={20} width={200} />
            </div>
          </div>
          
          {/* Hospital info skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <Skeleton height={30} width={250} className="mb-4" />
            <Skeleton height={20} width={400} className="mb-4" />
            <div className="flex gap-4">
              <Skeleton height={24} width={80} />
              <Skeleton height={24} width={120} />
            </div>
          </div>

          {/* Doctor cards skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Skeleton circle width={60} height={60} className="mr-4" />
                  <div className="flex-1">
                    <Skeleton height={24} width={150} className="mb-2" />
                    <Skeleton height={16} width={100} />
                  </div>
                </div>
                <Skeleton height={16} width={200} className="mb-4" />
                <div className="flex gap-2 mb-4">
                  <Skeleton height={24} width={60} />
                  <Skeleton height={24} width={80} />
                </div>
                <div className="flex gap-2">
                  <Skeleton height={40} className="flex-1" />
                  <Skeleton height={40} className="flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onPageChange('search')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Hospitals
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedHospital.name}</h1>
            <p className="text-gray-600 mb-4">{selectedHospital.address}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-medium">{selectedHospital.rating}</span>
              </div>
              <div className="text-gray-600">
                {selectedHospital.doctorCount} Doctors Available
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, index) => {
            return (
              <motion.div 
                key={doctor._id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doctor.status)}`}>
                    {doctor.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{doctor.rating} rating</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{doctor.hours}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onBookAppointment(doctor, 'in-person')}
                    disabled={doctor.status !== 'Available'}
                    className={`w-full flex items-center justify-center py-3 rounded-lg font-medium transition-colors ${
                      doctor.status === 'Available'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book In-Person Visit
                  </button>
                  
                  <button
                    onClick={() => onBookAppointment(doctor, 'telemedicine')}
                    disabled={doctor.status !== 'Available'}
                    className={`w-full flex items-center justify-center py-3 rounded-lg font-medium border-2 transition-colors ${
                      doctor.status === 'Available'
                        ? 'border-green-600 text-green-600 hover:bg-green-50'
                        : 'border-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Book Video Consultation
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Please try again later or contact the hospital directly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;