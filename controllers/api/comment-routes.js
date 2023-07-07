const router = require('express').Router();
const { Comments, Post, User } = require('../../models');

// Post request for comments
router.post('/', async (req, res) => {
    try {
        const dbCommentData = await Comments.create({
            description: req.body.description,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbCommentData);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET request for a single post (Should get single post by clicking on post on homepage)

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.post_id, {
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
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;