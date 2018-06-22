var express = require('express');
var app = express();
const functions = require('firebase-functions');

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
var user_ref = db.ref("users");

// home page 
app.get('/', function (req, res) {
    res.render('home', {
    });
});

app.post('/sign-up', (req, res) => {
    let email_info = req.body.email_sign.replace(/\s/g, '');
    let username = req.body.username_sign.replace(/\s/g, '');
    let password = req.body.password_sign.replace(/\s/g, '');
//    let error = "";
    
    if (email_info === "" || username === "" || password === "") {
        res.render('home', {error_signup: "Fields must be filled out."});
    } else {
        // Something is off here
        console.log("1")
        user_ref.orderByChild('email').equalTo(email_info).on('value', function (snap) {
            console.log("2")
            if (snap.val()) {
                //res.render('home', {error_signup: "User already exists."});
//                error = "no no no"
                res.render('home',{});

            } else {
                console.log("3")
                user_ref.push({
                    username: req.body.username_sign,
                    email: req.body.email_sign,
                    password: req.body.password_sign
                });
//                error = "yes yes yes"
                res.render('home',{});

            }
        });

    }
});

app.post('/login', (req, res) => {
    let email = req.body.email_log;
    let password = req.body.password_log;
    user_ref.orderByChild('email').equalTo(email).on('child_added', function (snap) {
        if (snap.val()) {
            if (snap.val().password === password) {
                res.render('game', {
                    username: snap.val().username
                });
            } else {
                res.render('home', {
                    error_login: "Incorrect password."
                });
            }

        } else {
            res.render('home', {
                error_login: "User not found."
            });
        }
    });
});

// game page 
app.get('/game', function (req, res) {
    res.render('game', {
    });
});

app.listen(3000);
console.log('3000 is the magic port');

exports.snaek = functions.https.onRequest(app);
