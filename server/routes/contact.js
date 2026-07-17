const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { appendLeadToSheet } = require('../config/googleSheets');

// Rate limiter middleware: Max 10 requests per 15 minutes from an IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: {
    success: false,
    message: 'Too many demo requests from this connection. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Input validations
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('organization')
    .trim()
    .isLength({ max: 100 }).withMessage('Organization name must not exceed 100 characters')
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
    .escape()
];

// POST /api/contact
router.post('/', contactLimiter, contactValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }

  const { name, email, organization, message } = req.body;

  try {
    const createdAt = new Date();
    
    // Log inquiry to stdout
    console.log(`[INQUIRY] Received: ${name} <${email}>`);
    console.log(`  Organization: ${organization || 'N/A'}`);
    console.log(`  Message:      ${message}`);

    // Sync to Google Sheets asynchronously (non-blocking)
    appendLeadToSheet({
      name,
      email,
      organization: organization || '',
      message,
      createdAt
    }).catch(err => {
      console.error('[GOOGLE-SHEETS] Asynchronous sync failure:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Our system architecture team will follow up within 24 hours.',
      mode: 'sheets'
    });

  } catch (error) {
    console.error('[SERVER ERROR] Error processing lead submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing inquiry submission. Please try again later.'
    });
  }
});

module.exports = router;
