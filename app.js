var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'pug');
app.use(express.static("public"));

// file
var fs = require('fs');

// Parsing input data
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: true }));

// Database/Firebase

var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://snaek-db.firebaseio.com"
});

var db = firebase.database();
let ref = db.ref("restricted_access");

// home page 
app.get('/', function (req, res) {
    res.render('home', {
    });
});

app.post('/login', (req, res) => {
    var user_ref = ref.child("users");

    user_ref.push({
        username: req.body.username_sign,
        email: req.body.email_sign,
        password: req.body.password_sign
    });

    res.render('home', {
        // Maybe add something?
    });
});

app.post('/sign-up', (req, res) => {
    let ref = ref.child("users");

    ref.authWithPassword({
        email    : req.body.username_signin,
        password : req.body.password_sign
    }, function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    });

    res.render('home', {
        // Maybe add something?
    });
});

// home page 
app.get('/game', function (req, res) {
    res.render('game', {
    });
});

app.listen(3000);
console.log('3000 is the magic port');