const express = require('express');
const router = express.Router();
const { registerUser, loginUser,logout } = require('../controllers/authController'); // Ensure this path is correct

router.get('/', (req, res) => {
    res.send("hey, it's working");
});

// Ensure you're using the correct handler functions
router.post('/register', registerUser);
router.post('/login', loginUser); 
router.post('/logout',logout);// Ensure this line is present

module.exports = router;
