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

// home page 
app.get('/', function (req, res) {
    res.render('home', {
    });
});

app.post('/', (req, res) => {
    let account = {
        username: req.body.username_sign,
        email: req.body.email_sign,
        password: req.body.email_sign
    };

    var json_data = JSON.stringify(account);
    fs.writeFile("account.txt", json_data, function(err) {
        if (err) {
            console.log(err);
        }
    });

    res.render('home', {
        // Maybe add something?
    });
})

app.listen(3000);
console.log('3000 is the magic port');