var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

// Function get all posts.
function getAllPosts() {
    var defer = q.defer();
    // console.log(JSON.stringify(user));
    var query = conn.query('SELECT * FROM posts', function(error, posts) {
        if (error) {
            defer.reject(error);
        } else {
            defer.resolve(posts);
        }
    });
    console.log(query.sql); // Print SQL Query.
    return defer.promise;
}
// Function add a new post.
function addPost(params) {
    if (params) {
        var defer = q.defer();
        // console.log(JSON.stringify(user));
        var query = conn.query('INSERT INTO posts SET ?', params, function(error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });
        console.log(query.sql); // Print SQL Query.
        return defer.promise;
    }
    return false;
    
}
// Function get post by id.
function getPostById(id) {
    if (id) {
        var defer = q.defer();
        // console.log(JSON.stringify(user));
        var query = conn.query('SELECT * FROM posts WHERE ?', {id: id}, function(error, posts) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(posts);
            }
        });
        console.log(query.sql); // Print SQL Query.
        return defer.promise;
    }

    return false;
}

// Function update a post.
function updatePost(params) {
   if (params) {
    var defer = q.defer();
    console.log(params.title+', ' +  params.content + ', '+params.author+', '+ new Date() +', '+params.id);
        // console.log(JSON.stringify(user));
        var query = conn.query('UPDATE posts SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?',
            [params.title, params.content, params.author, new Date(), params.id],
            function(error, results, fields) {
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

// Function delete a post by id.
function deletePost(id) {
    if (id) {
        console.log(id);
        var defer = q.defer();
        // console.log(JSON.stringify(user));
        var query = conn.query('DELETE FROM posts WHERE id = ?', [id], function(error, results, fields) {
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

module.exports = {
	getAllPosts: getAllPosts,
    addPost: addPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost: deletePost
}