import mongoose from 'mongoose';
import Hospital from './src/models/Hospital.js';
import Doctor from './src/models/Doctor.js';
import connectDB from './src/config/database.js';

// Sample data for seeding
const hospitals = [
  {
    name: 'Apollo Dermatology Center',
    address: '15 MG Road, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110001',
    rating: 4.8,
    specialties: ['General Dermatology', 'Cosmetic Procedures', 'Skin Cancer Treatment'],
    phone: '011-2345-6789',
    website: 'apollo-derm.in',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400'
  },
  {
    name: 'Fortis Skin Institute',
    address: '45 Vasant Kunj',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110070',
    rating: 4.7,
    specialties: ['Dermatology', 'Hair Transplant', 'Laser Treatment'],
    phone: '011-2345-6790',
    website: 'fortis-skin.in',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400'
  },
  {
    name: 'Max Super Speciality Dermatology',
    address: '2, Press Enclave Road, Saket',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110017',
    rating: 4.6,
    specialties: ['Pediatric Dermatology', 'Allergy Treatment', 'Psoriasis Care'],
    phone: '011-2345-6791',
    website: 'maxhealthcare.in',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400'
  }
];

const doctors = [
  {
    name: 'Dr. Rajesh Sharma',
    specialty: 'General Dermatology',
    experience: 15,
    rating: 4.8,
    status: 'Available',
    hours: '09:00-17:00',
    expertise: ['Acne Treatment', 'Skin Cancer Screening', 'Psoriasis Treatment'],
    education: 'MD Dermatology, AIIMS Delhi',
    consultationFee: { inPerson: 1500, telemedicine: 800 },
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
  },
  {
    name: 'Dr. Priya Singh',
    specialty: 'Cosmetic Dermatology',
    experience: 12,
    rating: 4.9,
    status: 'Available',
    hours: '10:00-18:00',
    expertise: ['Botox', 'Chemical Peels', 'Laser Hair Removal'],
    education: 'MD Dermatology, PGIMER Chandigarh',
    consultationFee: { inPerson: 2000, telemedicine: 1000 },
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
  },
  {
    name: 'Dr. Arjun Patel',
    specialty: 'Pediatric Dermatology',
    experience: 10,
    rating: 4.7,
    status: 'Available',
    hours: '09:00-16:00',
    expertise: ['Eczema in Children', 'Birthmarks', 'Pediatric Acne'],
    education: 'MD Dermatology, KEM Hospital Mumbai',
    consultationFee: { inPerson: 1200, telemedicine: 600 },
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert hospitals
    const createdHospitals = await Hospital.insertMany(hospitals);
    console.log(`Created ${createdHospitals.length} hospitals`);
    
    // Add hospital IDs to doctors and insert
    const doctorsWithHospitalIds = doctors.map((doctor, index) => ({
      ...doctor,
      hospitalId: createdHospitals[index % createdHospitals.length]._id
    }));
    
    const createdDoctors = await Doctor.insertMany(doctorsWithHospitalIds);
    console.log(`Created ${createdDoctors.length} doctors`);
    
    // Update hospital doctor counts
    for (let hospital of createdHospitals) {
      const doctorCount = await Doctor.countDocuments({ hospitalId: hospital._id });
      await Hospital.findByIdAndUpdate(hospital._id, { doctorCount });
    }
    
    console.log('Updated hospital doctor counts');
    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();