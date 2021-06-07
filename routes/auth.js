const express = require('express');
const router = express.Router();
// import controller
const {emailAuthentication} = require("../controllers/auth_email");
const {userDetails} = require("../controllers/userdetails");
const {signup, activateAccount} = require("../controllers/auth_signup");
const {forgotPassword,resetPassword} = require("../controllers/auth_forgot");

// signup page routes
router.post('/email-authentication', emailAuthentication);
router.get('/user-details', userDetails);

// signup page routes
router.post('/signup', signup);
router.post('/email-activate', activateAccount);

// forgot password routes
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);


module.exports = router;