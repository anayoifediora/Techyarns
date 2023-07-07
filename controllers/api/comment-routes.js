const router = require('express').Router();
const { Comments, Post, User } = require('../../models');

// POST request for comments
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



module.exports = router;