const express = require('express');
const router = express.Router();

// Existing routes for owners...

// Define the /admin route
router.get('/admin',(req, res) => {
    let success=req.flash("success");
    res.render("createproducts",{success}); // Replace this with the actual logic or view rendering for the admin panel
});

module.exports = router;
