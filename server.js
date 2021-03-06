const express = require ('express');
var passport = require('passport');
var flash = require('connect-flash');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const https = require('https');
const bcrypt = require('bcrypt')
require('dotenv').config()

//express app
const app = express();

require('./config/passport')(passport);

// parse request
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/roomies-as', { useNewUrlParser: true });

require('./app/routes/task.routes.js')(app,passport);


mongoose.Promise = global.Promise;

// Require tasks routes


// // Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// });





// const port = process.env.PORT || 3000;
// app.listen(port);
//
//
// //monitor requests

 app.listen(3000, ()=>{

    console.log("server is listening on port 3000");
 });

//app.listen(process.env.PORT || 3000 (req, res) => {
//   console.log("Listening at port 3000")
//})
