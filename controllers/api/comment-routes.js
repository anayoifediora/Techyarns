const router = require('express').Router();
const { Comments, Post, User } = require('../../models');

// POST request for comments
router.post('/', async (req, res) => {
    try {
        const dbCommentData = await Comments.create({
            post_id: req.body.post_id,
            description: req.body.description,
            user_id: req.session.user_id,
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



module.exports = router;