import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// Get appointments
router.get('/', async (req, res) => {
  try {
    const { patientEmail, doctorId, status, limit = 10 } = req.query;
    let query = {};

    if (patientEmail) {
      query.patientEmail = patientEmail;
    }
    if (doctorId) {
      query.doctorId = doctorId;
    }
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'name specialty')
      .populate('hospitalId', 'name address city')
      .limit(parseInt(limit))
      .sort({ appointmentDate: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('doctorId', 'name specialty hours')
      .populate('hospitalId', 'name address city phone');
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
});

// Create new appointment
router.post('/', [
  body('patientName').trim().notEmpty().withMessage('Patient name is required'),
  body('patientEmail').isEmail().withMessage('Valid email is required'),
  body('patientPhone').trim().notEmpty().withMessage('Phone number is required'),
  body('doctorId').isMongoId().withMessage('Valid doctor ID is required'),
  body('hospitalId').isMongoId().withMessage('Valid hospital ID is required'),
  body('appointmentDate').isISO8601().withMessage('Valid date is required'),
  body('timeSlot').trim().notEmpty().withMessage('Time slot is required'),
  body('type').isIn(['in-person', 'telemedicine']).withMessage('Valid appointment type is required'),
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

    // Check if appointment slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId: req.body.doctorId,
      appointmentDate: new Date(req.body.appointmentDate),
      timeSlot: req.body.timeSlot,
      status: { $in: ['scheduled', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctorId', 'name specialty')
      .populate('hospitalId', 'name address city');

    res.status(201).json({
      success: true,
      data: populatedAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
});

// Update appointment status
router.patch('/:id/status', [
  body('status').isIn(['scheduled', 'confirmed', 'completed', 'cancelled']).withMessage('Valid status is required'),
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

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('doctorId', 'name specialty')
     .populate('hospitalId', 'name address city');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message
    });
  }
});

export default router;