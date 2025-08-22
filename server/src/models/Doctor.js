import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  status: {
    type: String,
    enum: ['Available', 'Busy', 'Unavailable'],
    default: 'Available'
  },
  hours: {
    type: String,
    default: '09:00-17:00'
  },
  expertise: [{
    type: String,
    trim: true
  }],
  education: String,
  image: String,
  consultationFee: {
    inPerson: Number,
    telemedicine: Number
  }
}, {
  timestamps: true
});

// Index for search functionality
doctorSchema.index({ name: 'text', specialty: 'text', expertise: 'text' });

export default mongoose.model('Doctor', doctorSchema);