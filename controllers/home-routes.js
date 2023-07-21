const router = require('express').Router();
const { Post, User, Comments, } = require('../models');

//GET all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                model: User,
                attributes: ['username'],
                }
            ]
        })
        // res.status(200).json(dbPostData)
        const homePosts = dbPostData.map((homePost) => 
        homePost.get({ plain: true }));
        console.log(homePosts)
        res.render('homepage', {
            homePosts, loggedIn: req.session.loggedIn, userId: req.session.user_id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User,
                    attributes: ['username']
                },
                {
                    model: Comments
                }
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!'});
            return;
        }
        const singlePost = postData.get({ plain: true});
        console.log(singlePost)
        res.render('fullposts', {
            singlePost, loggedIn: req.session.loggedIn, userId: req.session.user_id     
        });
        // res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/dashboard', async (req, res) => {
    console.log(req.session)
    try {
        const dashData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User,}]
            
        });

        if (!dashData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        const dashBoardData = dashData.map((item) => 
        item.get({ plain: true }));
        console.log(dashBoardData)
        res.render('dashboard', {
            dashBoardData, loggedIn: req.session.loggedIn, userId: req.session.user_id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        // finds all comments associated with a post
        
        const dbCommentData = await Post.findByPk(req.params.id, {
            include: [{ model: Comments }, { model: User }]
        });
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found'});
            return;
        }
        const commentData = dbCommentData.map((item) => 
        item.get({ plain: true }));
        console.log(commentData)
        res.render('fullposts', {
            commentData, loggedIn: req.session.loggedIn, userId: req.session.user_id
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;