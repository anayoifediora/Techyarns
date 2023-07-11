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
        console.log(postData)
        res.render('fullposts', {
            postData, loggedIn: req.session.loggedIn,        
        });
        // res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;