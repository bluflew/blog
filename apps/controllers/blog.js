var express = require("express");
var router = express.Router();

var post_md = require("../models/post");

// Function get all posts from DB.
router.get("/", function(req, res) {
    // res.json({
    //   "message": "This is Blog page"
    // });
    var data = post_md.getAllPosts();
    data.then(function(posts) {
        var result = {
            posts: posts,
            error: false
        };
        res.render("blog/index", {
            data: result
        });
    }).catch(function(error) {
        var result = {
            error: "Could not get posts data"
        };
        res.render("blog/index", {
            data: result
        });
    });
    // res.render("blog/index");
});

// Function get a post by id.
router.get("/post/:id", function(req, res) {
    var data = post_md.getPostById(req.params.id);

    data.then(function(posts) {
        var post = posts[0];

        var result = {
            post: post,
            error: false
        };
        res.render("blog/post", {data: result});
    }).catch(function(error) {
         var result = {
            error: "Could not get post from DB!!"
        };
        res.render("blog/post", {data: result});
    });
});

//
router.get("/about", function(req, res) {
    res.render("blog/about");
});
module.exports = router;