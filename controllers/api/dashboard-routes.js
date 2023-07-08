const router = require('express').Router();
const { Comments, Post, User } = require('../../models');




router.get('/', async (req, res) => {
    try {
        const dashBoardData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post
                    
                },
            ],
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