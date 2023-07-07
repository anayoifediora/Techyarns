const { Comments } = require('../models');

const commentsData = [
    {
        description: 'This is excellent!',
    },
    {
        description: 'Superb content! 👌',
    },
    {
        description: 'Great piece of writing once again.',
    },
]


const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;