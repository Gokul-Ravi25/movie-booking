const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/Admin');
const AppError = require('../utils/appError');

// To generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

// Generate and send token
const sendToken = (Admin, res, statusCode) => {
  const token = generateToken(Admin._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true
  };

  // Set secure = true in production for sending cookies only over https
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // To remove password from response
  Admin.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      Admin
    }
  });
};

// To signup a Admin
exports.signUpUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    sendToken(newUser, res, 201);
  } catch {
    next(new AppError('Unable to Signup at the moment', 400));
  }
};

// Signin Admin
exports.signInUser = async (req, res, next) => {
  const { emailId, password } = req.body;

  try {
    // Check if email and password is supplied
    if (!emailId || !password) {
      return next(new AppError('Please provide email and password', 401));
    }

    const Admin = await User.findOne({ emailId }).select('+password');

    // Check if Admin exists and if password is correct
    if (!Admin || !(await Admin.verifyPassword(password, Admin.password))) {
      return res.status(200).json({
        status: 'unauthorized'
      });
    }

    // If above validations are passed, send token
    return sendToken(Admin, res, 200);
  } catch {
    return next(new AppError('Unable to Signin at the moment', 400));
  }
};

// Get Admin based token
exports.fetchAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(200).json({
      status: 'unauthorized'
    });
  } else {
    // Token Verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if Admin still exists
    const currentAdmin = await User.findById(decoded.id);

    if (currentAdmin) {
      res.status(200).json({
        status: 'success',
        data: {
          Admin: currentUser
        }
      });
    } else {
      next(new AppError('User does not exist! Unauthorized access', 401));
    }
  }
};

// Logout Admin
exports.signoutAdmin = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({ status: 'success' });
};
