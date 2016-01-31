// require modules
var express = require('express'),
    app = express(),
    request = require('request'),
    // oauth2 = require('simple-oauth2'),
    path = require('path');
bodyParser = require('body-parser');

// App settings
app.set('views', './views');
app.use('/image', express.static('image'));
app.use('/public', express.static('public'));
app.use('/style', express.static('style'));
app.set('view engine', 'jade');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

// Homepage
app.get('/', function(req, res) {
    fs.readFile('./public/browse.json', function(err, data) {
        if (err) {
            throw err;
        }

        var people = JSON.parse(data);

        res.render('index', {
            people: people,
            person: {
                "name": "Lisa Eng",
                "image": "https://media.licdn.com/media/AAEAAQAAAAAAAALfAAAAJDU2YWFiZGM0LTgxZmEtNDcyZC05ODI4LTViZGM1YTg5MDkyOQ.jpg",
                "work": ["Product Manager, Business Intelligence, Aereo", "Special Operations, Warby Parker Marketing, Quirky", "Special Customer Operations, Simon Schuster", "Associate, Triage Consulting Group"],
                "education": ["MBA from NYU Stern Business School, University of California San Diego"],
                "tags": ["strategy", "marketing", "tech", "SF", "49ers", "dogs", "consulting", "productmanager"],
                "job": "Product Manager at Oracle Data Cloud",
                "quote": "I am a dog-lover, 49ers fan, and tech enthusiast. Previously in New York, I live in San Francisco now with my husband and malti-poo dog, Izzo. Yes named after Coach Izzo!"
            }
        });
    });
});

app.get('/match', function(req, res) {
    res.render('match', {
        user: {
            "name": "Student",
            "image": "http://d9hhrg4mnvzow.cloudfront.net/womensilab.com/coffeechat2/bb0185b8-sussana-shuman_07107207106x000002.jpg",
            "bio":"",
            "tags": ["tech", "sf", "49ers"],
            "job": "Northwestern University"
        },
        match: {
            "name": "Lisa Eng",
            "image": "https://media.licdn.com/media/AAEAAQAAAAAAAALfAAAAJDU2YWFiZGM0LTgxZmEtNDcyZC05ODI4LTViZGM1YTg5MDkyOQ.jpg",
            "work": ["Product Manager, Business Intelligence, Aereo", "Special Operations, Warby Parker Marketing, Quirky", "Special Customer Operations, Simon Schuster", "Associate, Triage Consulting Group"],
                "education": ["MBA from NYU Stern Business School", "University of California San Diego"],
            "tags": ["strategy", "marketing", "tech", "SF", "49ers", "dogs", "consulting", "productmanager"],
            "job": "Product Manager at Oracle Data Cloud",
            "quote": "I am a dog-lover, 49ers fan, and tech enthusiast. Previously in New York, I live in San Francisco now with my husband and malti-poo dog, Izzo. Yes named after Coach Izzo!"
        }
    });
});

app.get('/browse', function(req, res) {
    fs.readFile('./public/browse.json', function(err, data) {
        if (err) {
            throw err;
        }

        var people = JSON.parse(data);

        res.render('browse', {
            people: people
        });
    });
});

var myLogger = function(req, res, next) {
    console.log('serverjs - new request: ' + req.path);
    next();
};

app.use(myLogger);

var fs = require('fs');
var resource = null;
fs.readFile('./resources/resources.txt', function(err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (i in array) {
        console.log(array[i]);
        resource = require(array[i]);
        if (typeof resource.getHandle === 'function') {
            console.log(resource.path + " GET");
            app.get('/' + resource.path, resource.getHandle);
        }
        if (typeof resource.postHandle === 'function') {
            console.log(resource.path + " POST");
            app.post('/' + resource.path, resource.postHandle);
        }
        if (typeof resource.putHandle === 'function') {
            console.log(resource.path + " PUT");
            app.put('/' + resource.path, resource.putHandle);
        }
    }
});

var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log('Example app listening on port %s!', port);
});