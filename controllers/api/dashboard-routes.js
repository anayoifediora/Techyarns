const router = require('express').Router();
const { Comments, Post, User, UserPost } = require('../../models');




router.get('/', async (req, res) => {
    try {
        const dashBoardData = await Post.findAll({
            where: {user_id: 2},
            
        });

        if (!dashBoardData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.status(200).json(dashBoardData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;