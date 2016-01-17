var exports = module.exports = {};
var dbConn = require("../../elf/db/dbConn.js");

var urlLinkedin='api.linkedin.com';
var urlBasicProfie='/v1/people/~?format=json';

exports.path='cat/user/:userId/getUserName';

exports.getHandle=function (req,res) {
	console.log('user/getUserName: userID: request received');
	var userId =req.params.userId;
	console.log('user/getUserName: userId: '+ userId);
	getUserName(userId,res);
}

function getUserName(userId,res)
{
	return dbConn.getUserName(userId,res);
}



// exports.putHandle=function (req,res) {
// 	res.status(405).end(); // Method Not Allowed
// }

// exports.deleteHandle=function (req,res) {
// 	res.status(405).end(); // Method Not Allowed
// }

// exports.postHandle=function (req,res) {
// 	res.status(405).end(); // Method Not Allowed
// }

