const express = require('express');
const app = express();
const db = require("./config/mongoose-connection"); // Ensure this file correctly connects to your MongoDB
const usersRouter = require('./routes/usersRouter');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const path = require("path");
const expressSession = require('express-session');
const flash = require('connect-flash');
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: 'abcd',
    })
);

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {
        success: req.flash('success'), 
        error: req.flash('error')
    });
});

// Define routes
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use("/shop", usersRouter); // Ensure this handles the /shop route

app.listen(3000, () => {

    console.log('Server is running on port 3000');
});






