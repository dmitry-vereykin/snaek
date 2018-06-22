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
var ref = db.ref("restricted_access");
var temp;
// home page 
app.get('/', function (req, res) {
    res.render('home', {
    });
});
app.post('/sign-up', (req, res) => {
    var user_ref = ref.child("users");
    let email = req.body.email_sign.replace(/\s/g, '');
    let username = req.body.username_sign.replace(/\s/g, '');
    let password = req.body.password_sign.replace(/\s/g, '');
    if(!email === '' || !username === '' || !password === ''){
        user_ref.orderByChild('email').equalTo(email).on('child_added', function(snap){
            if(snap.val()===null){
                user_ref.push({
                    username: req.body.username_sign,
                    email: req.body.email_sign,
                    password: req.body.password_sign
                });
            }else{
//                (req.body.errors).fadeIn(400).delay(3000).fadeOut(400);
//                function() {( "#words" ).dialog();}
            }
        });
    }else{
//        (req.body.errors).fadeIn(400).delay(3000).fadeOut(400);
//        function() {( "#words" ).dialog();}
    }
    res.render('home', {});
});
app.post('/login', (req, res) => {
    var user_ref = ref.child("users");
    let email = req.body.email_log;
    let password = req.body.password_log;
    user_ref.orderByChild('email').equalTo(email).on('child_added', function(snap){
        if(snap.val()===null){console.log('nope')}
        if(snap.val().password === password){
            res.render('game', {});
        }else{
            console.log('dafaq is dat password mofo sheeeeeeee suck mah asssssss like groceries')
        }
    });
});
// home page 
app.get('/game', function (req, res) {
    res.render('game', {
    });
});
app.listen(3000);
console.log('3000 is the magic port');