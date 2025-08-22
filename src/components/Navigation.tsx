import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MessageCircle, Stethoscope, Home, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Find Hospitals', icon: Search },
    { id: 'symptom-checker', label: 'AI Diagnosis', icon: Stethoscope },
    { id: 'appointments', label: 'My Appointments', icon: Calendar },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
              <Sparkles className="w-3 h-3 text-yellow-300 absolute translate-x-1 -translate-y-1" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DermaCare
              </span>
              <div className="text-xs text-slate-500 font-medium">Advanced AI Healthcare</div>
            </div>
          </motion.div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => onPageChange(id)}
                className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  currentPage === id 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background for active item */}
                {currentPage === id && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon with animation */}
                <motion.div
                  className={`relative z-10 ${currentPage === id ? 'text-white' : ''}`}
                  animate={{ 
                    rotate: currentPage === id ? 360 : 0,
                    scale: currentPage === id ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                
                <span className="relative z-10">{label}</span>
                
                {/* Notification dot for certain items */}
                {id === 'appointments' && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <motion.button 
              className="text-slate-600 hover:text-slate-900 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;