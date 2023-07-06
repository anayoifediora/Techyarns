const router = require('express').Router();
const { Post, User, Comments } = require('../models');

//GET all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['title'],
        })
        const homePosts = dbPostData.map((homePost) => 
        homePost.get({ plain: true }));

        res.render('homepage', {
            homePosts, loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});