var exports = module.exports = {};
    oauth2 = require('simple-oauth2'),
    path = require('path');

exports.path='wild/oauth/auth';

exports.linkedInOauth2 = oauth2({
        clientID: '77yzm37wv3z90u',
        clientSecret: '3JBCCGjo7FT3YPMB',
        site: 'https://www.linkedin.com',
        authorizationPath: '/uas/oauth2/authorization',
        tokenPath: '/uas/oauth2/accessToken'
    });

// Authorization oauth2 URI
var authorization_uri = exports.linkedInOauth2.authCode.authorizeURL({
    redirect_uri: 'http://localhost:1337/callback',
    scope: 'r_basicprofile',
    state: 'example-state-for-now-but-we-really-need-to-change-this'
});

exports.getHandle=function (req,res) {
	res.redirect(authorization_uri);
}


