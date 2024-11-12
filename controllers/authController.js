const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    const { email, password, fullname } = req.body;

    try {
       
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Account already exists with this email. Please log in!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            fullname,
        });

        
        const token = generateToken(newUser);

        
        res.cookie("token", token, { httpOnly: true });

        
        return res.status(201).json({ message: 'User created successfully', user: { email: newUser.email, fullname: newUser.fullname } });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


// module.exports.loginUser=async function(req,res){
//     let{email,password}=req.body;
//     let user =await userModel.findOne({email});
//     if(!user) return res.send("incorrect email or password");

//     bcrypt.compare(password,user.password,function(err,result){
//         if(result){
//             let token=generateToken(user);
//             res.cookie("token",token);
//             res.send("you can Login");
//         }
//         else{
//             return res.send("incorrect email or password");
//         }

//     });

// }

module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.send("Incorrect email or password");

    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token, { httpOnly: true });
            return res.redirect('/shop'); // Redirect to /shop on successful login
        } else {
            return res.send("Incorrect email or password");
        }
    });
}


module.exports.logout=async function(req,res){
    res.cookie('token',"");
    res.redirect("/");
}
