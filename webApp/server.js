var express = require('express'),
    app = express(),
    fs = require('fs'),
    request = require('request'),
    oauth2 = require('simple-oauth2')({
        clientID: '77yzm37wv3z90u',
        clientSecret: '3JBCCGjo7FT3YPMB',
        site: 'https://www.linkedin.com',
        authorizationPath: '/uas/oauth2/authorization',
        tokenPath: '/uas/oauth2/accessToken'
    }),
    resource = null;

// Authorization oauth2 URI
var authorization_uri = oauth2.authCode.authorizeURL({
    redirect_uri: 'http://localhost:1337/callback',
    scope: 'r_basicprofile',
    state: 'example-state-for-now-but-we-really-need-to-change-this'
});

app.get('/home', function(req, res) {
    res.send('Welcome to NU Coffee Chat!');
});

app.get('/', function(req, res) {
    res.send('Hello<br><a href="/auth">Log in with Github</a>');
});

// Initial page redirecting to Github
app.get('/auth', function(req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function(req, res) {
    var code = req.query.code,
        state = req.query.state;
    console.log('/callback');
    console.log(code);
    console.log(state);

    oauth2.authCode.getToken({
            code: code,
            state: state,
            redirect_uri: 'http://localhost:1337/callback'
        },
        saveToken);

    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message);
        }

        token = oauth2.accessToken.create(result);

        console.log(token);
    }
});

fs.readFile('./Resources/resources.txt', function(err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (i in array) {
        console.log(array[i]);
        resource = require(array[i]);
        app.get('/' + resource.path, function(req, res) {
            resource.handle(req, res);
        });
    }
});



var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log('Example app listening on port port!');
});