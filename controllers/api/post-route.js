const router = require('express').Router();
const { Post, User, Comments } = require('../../models');

//CREATE a post
router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbPostData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
      }
})

//UPDATE a post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            id: req.body.id,
            description: req.body.description,

            where: {
                id: req.params.id,
            }
        })
        res.status(200).json(postData);
    } catch(err) {
        res.status(400).json(err)
      }
})

// GET request for a single post (Should get single post by clicking on post on homepage)

router.get('/:id', async (req, res) => {
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
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;

