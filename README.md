# DermaCare ✨ - Advanced MERN Stack Dermatology Platform

A modern, responsive, and AI-powered dermatology platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring advanced UI/UX design and comprehensive healthcare functionality.

[**🚀 Live Demo**](https://vathsavv56.github.io/dermacare/)

![DermaCare Advanced UI](https://img.shields.io/badge/UI-Advanced-brightgreen) ![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue) ![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue) ![AI Powered](https://img.shields.io/badge/AI-Powered-orange)

---

## 🌟 Key Features

### 🔥 Advanced UI/UX
- **Modern Design**: Glassmorphism effects, gradient backgrounds, and contemporary styling
- **Smooth Animations**: Framer Motion-powered page transitions and micro-interactions
- **Responsive**: Mobile-first design optimized for all screen sizes
- **Loading States**: Beautiful skeleton screens and loading animations
- **Interactive Elements**: Hover effects, button animations, and dynamic components

### 🏥 Healthcare Platform
- **Hospital Discovery**: AI-powered hospital search with real-time availability
- **Doctor Profiles**: Comprehensive doctor information with ratings and expertise
- **Appointment Booking**: Both in-person and telemedicine consultations
- **AI Diagnosis**: Symptom checker with machine learning recommendations
- **Live Chat**: 24/7 AI-powered healthcare assistant

### 🛠️ Technical Excellence
- **MERN Stack**: Full-stack JavaScript application with modern architecture
- **TypeScript**: Type-safe development with comprehensive type definitions
- **API-First**: RESTful API design with proper error handling
- **Database**: MongoDB with optimized schemas and indexing
- **Security**: Rate limiting, input validation, and secure authentication

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://mongodb.com/) (v6 or higher)
- [npm](https://npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vathsavv56/DermatologyCareWebsite.git
   cd DermatologyCareWebsite
   ```

2. **Install dependencies:**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd server && npm install && cd ..
   ```

3. **Set up environment variables:**
   ```bash
   # Backend configuration
   cp server/.env.example server/.env
   
   # Update server/.env with your MongoDB URI and other settings
   ```

4. **Start the development servers:**
   ```bash
   # Start backend server (Terminal 1)
   npm run server
   
   # Start frontend server (Terminal 2)
   npm run dev
   
   # Optional: Seed database with sample data
   npm run seed
   ```

5. **Open your browser:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
/
├── public/                 # Static assets and favicons
├── server/                 # Backend Node.js/Express application
│   ├── src/
│   │   ├── config/        # Database and environment configuration
│   │   ├── models/        # MongoDB schemas (Hospital, Doctor, Appointment)
│   │   ├── routes/        # API endpoints and controllers
│   │   └── server.js      # Express server configuration
│   ├── .env.example       # Environment variables template
│   ├── seed.js           # Database seeding script
│   └── package.json      # Backend dependencies
├── src/                   # Frontend React application
│   ├── components/        # React components with advanced UI
│   │   ├── HomePage.tsx   # Landing page with hero section
│   │   ├── Navigation.tsx # Animated navigation bar
│   │   ├── HospitalSearch.tsx # Hospital discovery with filters
│   │   ├── DoctorList.tsx # Doctor profiles and booking
│   │   ├── BookingPage.tsx # Appointment scheduling
│   │   ├── ChatSupport.tsx # AI-powered chat assistant
│   │   └── ...           # Additional components
│   ├── lib/              # API services and utilities
│   │   ├── api.ts        # Production API service
│   │   ├── demoApi.ts    # Demo mode without MongoDB
│   │   └── supabase.ts   # Legacy Supabase integration
│   ├── App.tsx           # Main application with routing
│   ├── index.css         # Global styles and Tailwind
│   └── main.tsx          # React entry point
├── package.json          # Frontend dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite bundler configuration
```

---

## 🔧 Architecture Overview

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Clean API design with proper HTTP methods and status codes
- **MongoDB Integration**: Optimized schemas with indexing for search performance
- **Middleware**: CORS, rate limiting, security headers, and error handling
- **Validation**: Input sanitization and validation using express-validator
- **Environment Configuration**: Secure environment variable management

### Frontend (React + TypeScript + Vite)
- **Component Architecture**: Modular, reusable components with TypeScript
- **State Management**: React hooks for efficient state handling
- **Animation System**: Framer Motion for smooth transitions and interactions
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized production builds

### API Endpoints

#### Hospitals
- `GET /api/hospitals` - Search and list hospitals
- `GET /api/hospitals/:id` - Get hospital details
- `POST /api/hospitals` - Create hospital (admin)

#### Doctors
- `GET /api/doctors` - List doctors with filters
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Create doctor profile (admin)

#### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Book new appointment
- `PATCH /api/appointments/:id/status` - Update appointment status

---

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Modern blues, purples, and medical-themed colors
- **Typography**: Inter font family for clean, professional text
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Shadows**: Layered shadow system for depth and hierarchy

### Interactive Elements
- **Hover States**: Smooth transitions on all interactive elements
- **Loading States**: Skeleton screens that match actual content layout
- **Error Handling**: User-friendly error messages with retry options
- **Feedback**: Toast notifications for user actions and system status

### Mobile Experience
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Responsive Grid**: Adaptive layouts that work on all screen sizes
- **Performance**: Optimized images and lazy loading for mobile networks

---

## 🔒 Security & Performance

### Security Features
- **Rate Limiting**: Prevents API abuse and DDoS attacks
- **Input Validation**: Comprehensive validation on all user inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Environment Variables**: Secure configuration management

### Performance Optimizations
- **Code Splitting**: Dynamic imports for better bundle sizes
- **Image Optimization**: Responsive images with proper formats
- **Caching**: Browser caching headers for static assets
- **Database Indexing**: Optimized queries with proper indexes

---

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the `server` directory:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_domain
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### Production Build
```bash
# Build frontend
npm run build

# Start production servers
npm run server  # Backend
npm run preview # Frontend preview
```

### Docker Deployment (Optional)
```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ .
EXPOSE 5000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add proper error handling
- Write responsive CSS
- Test on multiple devices

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern healthcare and medical applications
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Animations**: [Framer Motion](https://framer.com/motion/) for smooth interactions
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/) for rapid styling
- **Backend Framework**: [Express.js](https://expressjs.com/) for robust API development

---

## 📞 Support

For support, email support@dermacare.com or join our Slack channel.

**Made with ❤️ for better healthcare accessibility**