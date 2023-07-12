const router = require('express').Router();
const { Post, User, Comments } = require('../models');

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
        // console.log(homePosts)
        res.render('homepage', {
            homePosts, loggedIn: req.session.loggedIn,
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
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!'});
            return;
        }
        const singlePost = postData.get({ plain: true});
        console.log(singlePost)
        res.render('fullposts', {
            singlePost, loggedIn: req.session.loggedIn,        
        });
        // res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        const dashBoardData = await Post.findAll({
            where: {user_id: 2},
            
        });

        if (!dashBoardData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        console.log(dashBoardData)
        res.render('dashboard', {
            dashBoardData, loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;