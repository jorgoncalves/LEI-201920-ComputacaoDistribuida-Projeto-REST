const express = require('express');

const { check } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/authController');

router.post(
  '/signup',
  [
    check('Email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    check('Password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password'),
  ],
  authController.signup
);
router.post('/login', authController.login);

module.exports = router;
