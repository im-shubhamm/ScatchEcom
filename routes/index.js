const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model'); // Ensure the path is correct
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');

// Route to display all products

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
})
router.get('/shop',isLoggedIn, async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await productModel.find(); // Adjust this based on your model
        
        // Render the shop page with the products
        res.render('shop', { products }); // Ensure 'shop' matches your EJS template file name
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

router.get('/addtocart/:id',isLoggedIn,async function(req,res){
   let user =await  userModel.findOne({user:req.user.email});
   user.cart.push(p)
})
module.exports = router;
