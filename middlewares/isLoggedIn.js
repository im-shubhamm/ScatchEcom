// const jwt = require('jsonwebtoken');
// const userModel = require('../models/user-model');
// const cookieParser = require('cookie-parser');

// module.exports = async function(req, res, next) {
//     // Check if the token exists in the cookies
//     const token = req.cookies.token; // Access the token correctly

//     if (!token) {
//         req.flash("error", "You need to log in first");
//         return res.redirect("/"); // Redirect to the homepage
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_KEY);
//         // Find the user in the database
//         const user = await userModel.findOne({ email: decoded.email }).select("-password");
        
//         if (!user) {
//             req.flash("error", "User not found");
//             return res.redirect("/");
//         }

//         req.user = user; // Attach the user to the request
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         console.error("JWT verification error:", err); // Log the error for debugging
//         req.flash("error", "Something went wrong");
//         res.redirect("/");
//     }
// };
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next) {
    // Check if the token exists
    if (!req.cookies.token) {
        console.log("No token found in cookies");
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }
    try {
        // Verify the token
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        console.log("Decoded token:", decoded); // Debugging line

        // Fetch the user based on the email in the decoded token
        let user = await userModel.findOne({ email: decoded.email }).select("-password");
        
        // If user is not found
        if (!user) {
            console.log("User not found for email:", decoded.email); // Debugging line
            req.flash("error", "User not found");
            return res.redirect("/");
        }
        
        req.user = user;
        next();
    } catch (err) {
        console.error("Error verifying token:", err); // Debugging line
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};
