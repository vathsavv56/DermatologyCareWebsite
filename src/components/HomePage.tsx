import React, { useEffect, useState } from 'react';
import { Search, MapPin, Calendar, Users, Award, Shield, Clock, Star, ArrowDown, Heart, Zap, Globe } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
            style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px)` }}
          ></div>
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 text-blue-300/30 animate-bounce"
            style={{ transform: `translateY(${scrollY * 0.4}px)`, animationDelay: '0s' }}
          >
            <Heart className="w-12 h-12" />
          </div>
          <div 
            className="absolute top-1/3 right-1/4 text-green-300/30 animate-bounce"
            style={{ transform: `translateY(${scrollY * -0.3}px)`, animationDelay: '1s' }}
          >
            <Shield className="w-16 h-16" />
          </div>
          <div 
            className="absolute bottom-1/3 left-1/3 text-purple-300/30 animate-bounce"
            style={{ transform: `translateY(${scrollY * 0.2}px)`, animationDelay: '2s' }}
          >
            <Zap className="w-10 h-10" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full px-6 py-2 mb-8 shadow-lg">
              <Globe className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-800 font-semibold text-sm">India's Premier Dermatology Platform</span>
            </div>

            {/* Main Heading with Gradient Text */}
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Expert Skin Care
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-800 bg-clip-text text-transparent">
                At Your Fingertips
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Connect with India's top dermatologists, book instant appointments, and get professional skin care solutions with our AI-powered platform
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => onPageChange('search')}
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 min-w-[250px] justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Search className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Find Specialists</span>
              </button>
              
              <button
                onClick={() => onPageChange('symptom-checker')}
                className="group bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:border-blue-300 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 min-w-[250px] justify-center"
              >
                <Shield className="w-6 h-6 group-hover:scale-110 transition-transform" />
                AI Symptom Checker
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <ArrowDown className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-slate-500 text-sm mt-2 font-medium">Scroll to explore</p>
            </div>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Trusted by Thousands Across India
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join the revolution in digital healthcare with our comprehensive dermatology platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Certified Doctors', value: '500+', color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100' },
              { icon: MapPin, label: 'Partner Hospitals', value: '150+', color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100' },
              { icon: Calendar, label: 'Appointments Booked', value: '50K+', color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-50 to-purple-100' },
              { icon: Star, label: 'Patient Satisfaction', value: '98%', color: 'from-yellow-500 to-orange-500', bgColor: 'from-yellow-50 to-orange-100' }
            ].map((stat, index) => (
              <div key={index} className="group text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.bgColor} mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <stat.icon className={`w-10 h-10 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className="text-4xl font-black text-slate-900 mb-3 group-hover:scale-105 transition-transform">{stat.value}</div>
                <div className="text-slate-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-100"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8">
              Why Choose 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> DermaCare</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of dermatology care with our comprehensive digital health platform powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Search,
                title: 'Smart Hospital Discovery',
                description: 'Find the best dermatology hospitals across India with advanced AI-powered filtering and real-time availability tracking',
                gradient: 'from-blue-500 to-blue-600',
                bgGradient: 'from-blue-50 to-blue-100'
              },
              {
                icon: Calendar,
                title: 'Instant Booking System',
                description: 'Book appointments with certified dermatologists in seconds with our intelligent scheduling system and automated confirmations',
                gradient: 'from-green-500 to-green-600',
                bgGradient: 'from-green-50 to-green-100'
              },
              {
                icon: Shield,
                title: 'AI Symptom Analysis',
                description: 'Get preliminary skin condition assessments using our advanced machine learning diagnostic tool trained on thousands of cases',
                gradient: 'from-purple-500 to-purple-600',
                bgGradient: 'from-purple-50 to-purple-100'
              },
              {
                icon: Users,
                title: '24/7 Expert Support',
                description: 'Connect with healthcare professionals anytime through our integrated chat support system with real-time assistance',
                gradient: 'from-orange-500 to-orange-600',
                bgGradient: 'from-orange-50 to-orange-100'
              },
              {
                icon: Award,
                title: 'Certified Excellence',
                description: 'All our dermatologists are board-certified with years of specialized experience and continuous medical education',
                gradient: 'from-indigo-500 to-indigo-600',
                bgGradient: 'from-indigo-50 to-indigo-100'
              },
              {
                icon: Clock,
                title: 'Telemedicine Ready',
                description: 'Consult with doctors remotely through secure HD video calls, digital prescriptions, and follow-up care management',
                gradient: 'from-pink-500 to-pink-600',
                bgGradient: 'from-pink-50 to-pink-100'
              }
            ].map((feature, index) => (
              <div key={index} className="group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border border-slate-100 hover:border-blue-200 overflow-hidden h-full">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.bgGradient} rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 opacity-50`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
              Skin Care Journey?
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of patients who trust our platform for their dermatology needs. Start your journey to healthier skin today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => onPageChange('search')}
              className="group relative bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 min-w-[250px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Search className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
              <span className="relative z-10">Get Started Now</span>
            </button>
            
            <button
              onClick={() => onPageChange('appointments')}
              className="group bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 min-w-[250px]"
            >
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              View Appointments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}