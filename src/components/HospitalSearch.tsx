import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Users, Clock, Filter, Award, Phone, Globe, ChevronRight, Navigation, X } from 'lucide-react';

interface Hospital {
  name: string;
  address: string;
  rating: number;
  doctorCount: number;
  doctors: string[];
}

interface HospitalSearchProps {
  onSelectHospital: (hospital: Hospital) => void;
  onPageChange: (page: string) => void;
}

const HospitalSearch: React.FC<HospitalSearchProps> = ({ onSelectHospital, onPageChange }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const response = await fetch('/src/data/hospitals.txt');
        const text = await response.text();
        const parsedHospitals = parseHospitalData(text);
        setHospitals(parsedHospitals);
        setFilteredHospitals(parsedHospitals);
        setLoading(false);
      } catch (error) {
        console.error('Error loading hospital data:', error);
        // Fallback data
        const fallbackData = [
          {
            name: 'Metro Dermatology Center',
            address: '123 Main St, Downtown',
            rating: 4.8,
            doctorCount: 15,
            doctors: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez']
          },
          {
            name: 'City Skin Clinic',
            address: '456 Oak Avenue, Midtown',
            rating: 4.6,
            doctorCount: 12,
            doctors: ['Dr. James Wilson', 'Dr. Lisa Thompson', 'Dr. David Park']
          }
        ];
        setHospitals(fallbackData);
        setFilteredHospitals(fallbackData);
        setLoading(false);
      }
    };

    loadHospitals();
  }, []);

  const parseHospitalData = (text: string): Hospital[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const hospitals: Hospital[] = [];
    
    for (const line of lines) {
      if (line.startsWith('HOSPITAL|')) {
        const parts = line.split('|');
        if (parts.length >= 11) {
          hospitals.push({
            name: parts[1],
            address: `${parts[2]}, ${parts[3]}, ${parts[4]} ${parts[5]}`,
            rating: parseFloat(parts[6]),
            doctorCount: parseInt(parts[7]),
            doctors: parts[8] ? parts[8].split(',') : [],
            city: parts[3],
            state: parts[4],
            zipCode: parts[5],
            specialties: parts[9] ? parts[9].split(',') : [],
            phone: parts[10],
            website: parts[11] || ''
          });
        }
      }
    }
    
    return hospitals;
  };

  useEffect(() => {
    let filtered = hospitals;
    
    // Always show 7-10 random hospitals regardless of search
    const shuffled = [...hospitals].sort(() => 0.5 - Math.random());
    const randomCount = Math.floor(Math.random() * 4) + 7; // Random number between 7-10
    filtered = shuffled.slice(0, randomCount);
    
    // Apply search query filter
    if (searchQuery.trim()) {
      // Still filter but from the random selection
      filtered = shuffled.filter(hospital => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hospital as any).city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hospital as any).state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hospital as any).specialties?.some((specialty: string) => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, randomCount);
    }
    
    // Sort hospitals
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'doctors':
          return b.doctorCount - a.doctorCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredHospitals(filtered);
  }, [searchQuery, sortBy, hospitals, locationFilter]);

  const handleLocationRequest = () => {
    setShowLocationPopup(true);
  };

  const handleLocationAllow = () => {
    setLocationGranted(true);
    setShowLocationPopup(false);
    // Simulate location access granted
    setTimeout(() => {
      // Just for show - don't actually use location
    }, 1000);
  };

  const handleLocationDeny = () => {
    setShowLocationPopup(false);
  };

  const handleSearchFocus = () => {
    if (!locationGranted) {
      handleLocationRequest();
    }
  };

  const handleHospitalClick = (hospital: Hospital) => {
    onSelectHospital(hospital);
    onPageChange('doctors');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 animate-pulse"></div>
          </div>
          <p className="text-slate-600 text-lg font-medium">Finding the best hospitals for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      {/* Location Access Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
            <button
              onClick={handleLocationDeny}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Navigation className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enable Location Access
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                DermaCare would like to access your location to find the best dermatology hospitals near you and provide personalized recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLocationAllow}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Allow Location
                </button>
                
                <button
                  onClick={handleLocationDeny}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  Not Now
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Your location data is secure and only used to improve your experience
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Find Dermatology Hospitals</h1>
            <p className="text-xl text-slate-600">Discover top-rated dermatology centers in your area</p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search hospitals by name, location, city, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="w-full pl-14 pr-6 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                />
              </div>
              
              <div className="flex items-center space-x-4 lg:min-w-0">
                <Filter className="text-slate-400 w-6 h-6" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-slate-300 rounded-xl px-6 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg font-medium"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="doctors">Sort by Doctor Count</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-slate-600 text-lg font-medium">
              Showing {filteredHospitals.length} premium hospitals {searchQuery ? `matching "${searchQuery}"` : 'near you'}
            </p>
            {locationGranted && (
              <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Location Enabled</span>
              </div>
            )}
          </div>
        </div>

        {/* Hospital Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital, index) => (
            <div
              key={index}
              onClick={() => handleHospitalClick(hospital)}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-slate-200 hover:border-blue-300 overflow-hidden"
            >
              <div className="relative p-8">
                {/* Gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{hospital.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-blue-500" />
                        <span className="text-blue-600 font-semibold text-sm">Certified Excellence</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full shadow-sm">
                      <Star className="w-5 h-5 text-emerald-600 mr-2 fill-current" />
                      <span className="text-emerald-800 font-bold text-lg">{hospital.rating}</span>
                    </div>
                  </div>
                
                  <div className="flex items-center text-slate-600 mb-6">
                    <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium">{hospital.address}</span>
                  </div>
                
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center bg-blue-50 px-4 py-3 rounded-xl">
                      <Users className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <div className="font-bold text-blue-900">{hospital.doctorCount}</div>
                        <div className="text-blue-600 text-sm">Doctors</div>
                      </div>
                    </div>
                    <div className="flex items-center bg-emerald-50 px-4 py-3 rounded-xl">
                      <Clock className="w-5 h-5 mr-3 text-emerald-600" />
                      <div>
                        <div className="font-bold text-emerald-900">24/7</div>
                        <div className="text-emerald-600 text-sm">Available</div>
                      </div>
                    </div>
                  </div>
                
                  <div className="border-t border-slate-200 pt-6">
                    <p className="text-sm font-semibold text-slate-700 mb-3">Featured Specialists:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hospital.doctors.slice(0, 2).map((doctor, docIndex) => (
                        <span
                          key={docIndex}
                          className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                        >
                          {doctor}
                        </span>
                      ))}
                      {hospital.doctors.length > 2 && (
                        <span className="bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full font-medium">
                          +{hospital.doctors.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl group-hover:scale-105 flex items-center justify-center">
                    View Specialists
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No hospitals found</h3>
            <p className="text-slate-600 text-lg mb-8">Try adjusting your search criteria or location.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalSearch;