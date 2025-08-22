import express from 'express';
import { body, validationResult } from 'express-validator';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Get doctors by hospital ID or search
router.get('/', async (req, res) => {
  try {
    const { hospitalId, search, limit = 10 } = req.query;
    let query = {};

    if (hospitalId) {
      query.hospitalId = hospitalId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { expertise: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const doctors = await Doctor.find(query)
      .populate('hospitalId', 'name address city')
      .limit(parseInt(limit))
      .sort({ rating: -1, experience: -1 });

    res.json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('hospitalId', 'name address city phone');
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
});

// Create new doctor (admin only - for seeding data)
router.post('/', [
  body('hospitalId').isMongoId().withMessage('Valid hospital ID is required'),
  body('name').trim().notEmpty().withMessage('Doctor name is required'),
  body('specialty').trim().notEmpty().withMessage('Specialty is required'),
  body('experience').isInt({ min: 0 }).withMessage('Experience must be a positive number'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const doctor = new Doctor(req.body);
    await doctor.save();

    // Update hospital doctor count
    await Doctor.updateOne(
      { _id: req.body.hospitalId },
      { $inc: { doctorCount: 1 } }
    );

    const populatedDoctor = await Doctor.findById(doctor._id)
      .populate('hospitalId', 'name address city');

    res.status(201).json({
      success: true,
      data: populatedDoctor
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating doctor',
      error: error.message
    });
  }
});

export default router;