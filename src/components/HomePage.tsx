import React from 'react';
import { Search, MapPin, Calendar, Users, Award, Shield, Clock, Star } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Expert Dermatology Care
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Connect with certified dermatologists, book appointments instantly, and get professional skin care solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onPageChange('search')}
                className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Find Hospitals
              </button>
              <button
                onClick={() => onPageChange('symptom-checker')}
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
              >
                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Check Symptoms
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Certified Doctors', value: '500+', color: 'text-blue-600' },
              { icon: MapPin, label: 'Partner Hospitals', value: '150+', color: 'text-green-600' },
              { icon: Calendar, label: 'Appointments Booked', value: '10K+', color: 'text-purple-600' },
              { icon: Star, label: 'Patient Satisfaction', value: '98%', color: 'text-yellow-600' }
            ].map((stat, index) => (
              <div key={index} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of dermatology care with our comprehensive digital health platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Smart Hospital Search',
                description: 'Find the best dermatology hospitals near you with advanced filtering and real-time availability',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: Calendar,
                title: 'Instant Booking',
                description: 'Book appointments with certified dermatologists in just a few clicks with real-time scheduling',
                gradient: 'from-green-500 to-green-600'
              },
              {
                icon: Shield,
                title: 'AI Symptom Checker',
                description: 'Get preliminary skin condition assessments using our advanced AI-powered diagnostic tool',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                icon: Users,
                title: '24/7 Live Support',
                description: 'Connect with healthcare professionals anytime through our integrated chat support system',
                gradient: 'from-orange-500 to-orange-600'
              },
              {
                icon: Award,
                title: 'Certified Specialists',
                description: 'All our dermatologists are board-certified with years of specialized experience',
                gradient: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Clock,
                title: 'Telemedicine Ready',
                description: 'Consult with doctors remotely through secure video calls and digital prescriptions',
                gradient: 'from-pink-500 to-pink-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of patients who trust our platform for their dermatology needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('search')}
              className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Get Started Now
            </button>
            <button
              onClick={() => onPageChange('appointments')}
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              View Appointments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}