var mysql = require("mysql");

var exports = module.exports = {};


var pool = mysql.createPool({
    connectionLimit: 4, //maximum connection for Azure student
    host: "us-cdbr-azure-central-a.cloudapp.net",
    user: "b443fc80dd2566",
    password: "4d39195d",
    database: "coffeechat"
});

exports.getUserName = function(userId,res){
    console.log('dbConn.getUserName called ');

          pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log('Error in connection database');

                res.status(500).json({error:'Error in connection database'});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            var sql = "SELECT * FROM ?? WHERE ?? = ?";
            var inserts = ['users', 'id', userId];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function(err, rows) {
                if (!err) {
                    if(rows.length > 0 ) {
                         console.log("dbConn: found user: "+ userId);
                         res.json({id:userId, firstName:rows[0].firstName, lastName:rows[0].lastName});
                    }
                    else
                    {
                        console.log("dbConn: didnt find user: "+ id);
                        res.status(400).json({error:'Invalid UserID'});
                        
                    }
                           
                }

            });

            connection.on('error', function(err) {
                console.log('Error in connection database');

                res.status(500).json({error:'Error in connection database'});
                return;

            });
        });
 

}

exports.createUserIfNotExist = function(firstName, headline, id, lastName, accessToken,res) {
    console.log('dbConn.createUserIfNotExist called ');


          pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                console.log('Error in connection database');

                res.status(500).json({error:'Error in connection database'});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            var sql = "SELECT * FROM ?? WHERE ?? = ?";
            var inserts = ['users', 'linkedInID', id];
            sql = mysql.format(sql, inserts);

            connection.query(sql, function(err, rows) {
                var userId = '';
                if (!err) {
                    if(rows.length > 0 ) {
                         userId += rows[0].id;
                         console.log("dbConn: found user: "+ userId);
                         res.json({user:userId});
                    }
                    else
                    {
                        console.log("dbConn: didnt find user: "+ id);
                        var post = {
                            firstName: firstName,
                            lastName: lastName,
                            linkedInHeadline: headline,
                            linkedInID: id,
                            linkedInAT: accessToken
                         };

                        connection.query("INSERT INTO users SET ?", post, function(err, result) {
                            connection.release();
                                
                            if (!err) {
                                userId = result.insertId;
                                console.log("dbConn: created user: "+ userId);
                                res.json({user:userId});
                             }
                        });
                    }
                           
                }

            });

            connection.on('error', function(err) {
                console.log('Error in connection database');

                res.status(500).json({error:'Error in connection database'});
                return;

            });
        });
 

   
}

exports.test_query = function(res) {


    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log('Error in connection database');

            res.send('Error in connection database\n');
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("SELECT id, first, last, age FROM TESTTABLE", function(err, rows) {
            connection.release();
            var str = '';
            if (!err) {

                for (var i = 0; i < rows.length; i++) {
                    str += rows[i].id + ',' + rows[i].first + ',' + rows[i].last + ',' + rows[i].age + '\n';
                };
                console.log(str);

                res.send(str);
            }
        });

        connection.on('error', function(err) {
            console.log('Error in connection database');

            res.send('Error in connection database\n');
            return;

        });
    });

}