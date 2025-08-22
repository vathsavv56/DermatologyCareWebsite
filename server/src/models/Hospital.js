import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  doctorCount: {
    type: Number,
    default: 0
  },
  specialties: [{
    type: String,
    trim: true
  }],
  phone: String,
  website: String,
  image: String
}, {
  timestamps: true
});

// Index for search functionality
hospitalSchema.index({ name: 'text', city: 'text', specialties: 'text' });

export default mongoose.model('Hospital', hospitalSchema);