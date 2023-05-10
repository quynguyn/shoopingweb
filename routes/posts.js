const express = require('express');
const Post = require('../models/post');
// Initialize app
const router = express.Router();
// router.get('/', function (req, res) {
// 	res.send('home');
// });
router.get('/', function (req, res) {
	let posts = Post.find({}, function (err, posts) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(posts);
		}
	});
});
module.exports = router;