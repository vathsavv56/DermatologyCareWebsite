import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  patientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  patientPhone: {
    type: String,
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['in-person', 'telemedicine'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    trim: true
  },
  notes: String,
  meetingLink: String // For telemedicine appointments
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);