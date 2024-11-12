

const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedIn'); 
const upload = require('../config/multer-config'); 
// Create new product route with isLoggedIn middleware
router.post("/create", upload.single('image'), async (req, res) => {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    try {
        // Use productModel.create to create and save the product
        await productModel.create({
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer // This line expects image data from multer
        });

        req.flash("success", "Product created successfully!"); // Correct spelling of "success"
        res.redirect("/owners/admin"); // Redirect to the admin page after successful creation
    } catch (error) {
        console.error("Error creating product:", error);
        req.flash("error", "Error creating product"); // Flash error message for error case
        res.redirect("/product/create"); // Redirect back to the create product form
    }
});

module.exports = router;

