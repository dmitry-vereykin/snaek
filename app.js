var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'pug');
app.use(express.static("public"));

// Parsing input data
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: true }));

// Database


// home page 
app.get('/', function (req, res) {
    res.render('home', {
    });
});

app.post('/', (req, res) => {
    

    res.render('home', {
        error: "More ass added."
    });
});

app.post('/login', (req, res) => {
    

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