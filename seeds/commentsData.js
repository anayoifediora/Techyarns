const { Comments } = require('../models');

const commentsData = [
    {   
        user_id: 1,
        description: 'This is excellent!',
        post_id: 1
    },
    {   
        user_id: 2,
        description: 'Superb content! 👌',
        post_id: 1
    },
    {   
        user_id: 3,
        description: 'Great piece of writing once again.',
        post_id: 2
    },
]


const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;