import React from 'react';
import { Search, Calendar, User, MessageCircle, Stethoscope, Home, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Find Hospitals', icon: Search },
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'chat', label: 'Live Chat', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">DermaCare</span>
              <p className="text-xs text-slate-500 -mt-1">Professional Dermatology</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onPageChange(id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative group ${
                  currentPage === id 
                    ? 'text-blue-600 bg-blue-50 shadow-md' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{label}</span>
                {currentPage === id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <button className="text-slate-600 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;