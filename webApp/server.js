// require modules
var express = require('express'),
    app = express(),
    request = require('request'),
    oauth2 = require('simple-oauth2'),
    path = require('path');
    bodyParser = require('body-parser');

// App settings
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// LinkedIn Oauth2
var linkedInOauth2 = oauth2({
        clientID: '77yzm37wv3z90u',
        clientSecret: '3JBCCGjo7FT3YPMB',
        site: 'https://www.linkedin.com',
        authorizationPath: '/uas/oauth2/authorization',
        tokenPath: '/uas/oauth2/accessToken'
    });

// Authorization oauth2 URI
var authorization_uri = linkedInOauth2.authCode.authorizeURL({
    redirect_uri: 'http://localhost:1337/callback',
    scope: 'r_basicprofile',
    state: 'example-state-for-now-but-we-really-need-to-change-this'
});

// Homepage
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/success', function(req, res) {
    res.send('Success!\n Token: ' + token['token']['access_token']);
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

    linkedInOauth2.authCode.getToken({
            code: code,
            state: state,
            redirect_uri: 'http://localhost:1337/callback'
        },
        saveToken);

    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message);
        }

        token = linkedInOauth2.accessToken.create(result);

        // this is where we need to do something with their token...
        console.log(token);
        createOAuthUser(token.token.access_token)

        res.redirect('/');
    }
});

function createOAuthUser(token)
{
    console.log('createOAuthUser token', token);
    var http = require('http'); 

    var bodyString = JSON.stringify({
        accessToken: token
    });

    var options = {
      host: 'localhost',
      port: 1337,
      path: '/cat/oauth/getUserID',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length
      },
    };

    console.log('createOAuthUser body', bodyString);

    callback = function(response) {
        var userID = '';
        response.on('data', function(d) {
            userID= JSON.parse(d).user;
        });
        response.on('end', function() {
            console.log('server.js: got userID '+ userID);
            
        });

        req.on('error', function(e) {
            console.log('server.js: createOAuthUser met error '+ e);
        });
    }

    var req = http.request(options, callback);
    req.write(bodyString);
    req.end();
}

var fs = require('fs');
var resource = null;
fs.readFile('./Resources/resources.txt', function(err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    for (i in array) {
        console.log(array[i]);
        resource = require(array[i]);
        app.post('/' + resource.path, function(req, res) {
            resource.postHandle(req, res);
        });
    }
});

var port = process.env.PORT || 1337;

app.listen(port, function() {
    console.log('Example app listening on port %s!', port);
});

