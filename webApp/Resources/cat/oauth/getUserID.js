var exports = module.exports = {};
var dbConn = require("../../elf/db/dbConn.js");

var urlLinkedin='api.linkedin.com';
var urlBasicProfie='/v1/people/~?format=json';

exports.path='cat/oauth/getUserID';

exports.postHandle=function (req,res) {
	console.log('oAuth/getUserId: userID: request received');
	// console.log('oAuth/getUserId: body: '+ req.body.accessToken);
	req.accepts('application/json');
	var accessToken =req.body.accessToken;
	console.log('oAuth/getUserId: accessToken: '+ accessToken);
	getLinkedInBasicProfie(accessToken,res);
}

function getLinkedInBasicProfie(accessToken,res)
{
	var https = require('https'); 

	var options = {
	  host: urlLinkedin,
	  path: urlBasicProfie,
	  method: 'GET',
	  headers: {'Authorization': 'Bearer '+ accessToken}
	};

	callback = function(response) {
	    var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
			console.log('getBasicProfie: '+body);
            var parsed = JSON.parse(body);
            console.log('getBasicProfie errorcode: '+parsed.errorCode);
            if( parsed.id === undefined)
            {
            	console.log('getBasicProfie going to send back error msg');
            	 res.status(parseInt(parsed.status)).json({error:parsed.message});
            }
            else
            {
	            var userId = createUserIfNotExist( parsed.firstName, parsed.headline, parsed.id, parsed.lastName, accessToken, res);
       		 }
           
        });

        req.on('error', function(e) {
            res.status(response.status).json({error:e});
        });
	}

	var req = https.request(options, callback);
	req.end();
}

function createUserIfNotExist(firstName, headline, id, lastName, accessToken,res)
{
	return dbConn.createUserIfNotExist(firstName, headline, id, lastName, accessToken,res);
}

// exports.putHandle=function (req,res) {
// 	res.status(405).end(); // Method Not Allowed
// }

// exports.deleteHandle=function (req,res) {
// 	res.status(405).end(); // Method Not Allowed
// }

// exports.getHandle=function (req,res) {
// 	res.status(405).end(); // Method Not Allowed
// }

