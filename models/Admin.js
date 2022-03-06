const express = require('express');
const {
  signUpAdmin,
  signInAdmin,
  fetchAdmin,
  signoutAdmin
} = require('../controllers/AdminController');

const router = express.Router();

router
  .post('/signup', signUpAdmin)
  .post('/signin', signInAdmin)
  .get('/signin', fetchAdmin)
  .get('/signout', signoutAdmin);

module.exports = router;
