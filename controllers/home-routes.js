const router = require('express').Router();
const { Post, User, Comments } = require('../models');

//GET all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['title'],
        })
        const homePosts = dbPostData.get({ plain: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});