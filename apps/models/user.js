var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

// Function get all user from DB.
function getAllUsers() {
    var defer = q.defer();
    
    var query = conn.query('SELECT * FROM users', function(error, users, fields) {
        if (error) {
            defer.reject(error);
        } else {
            defer.resolve(users);
        }
    });
    console.log(query.sql); // Print SQL Query.
    return defer.promise;
}

// Function add a User.
function addUser(user) {
    if (user) {
        var defer = q.defer();
        console.log(JSON.stringify(user));
        var query = conn.query('INSERT INTO users SET ?', user, function(error, results, fields) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(results);
            }
        });
        console.log(query.sql); // Print SQL Query.
        return defer.promise;
    }
    return false;
}

// Function get info user by email.
function getUserByEmail(email) {
    if (email) {
        var defer = q.defer();

        var query = conn.query('SELECT * FROM users WHERE ?', {
            email: email
        }, function(error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });
        
        return defer.promise;
    }
    return false;
}

module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail,
    getAllUsers: getAllUsers
}