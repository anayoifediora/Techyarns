const { Post } = require('../models');

const postData = [
    {   
        user_id: 1,
        title: 'Evolution of HTML',
        description: 'HTML, also known as Hypertext Markup Language is a type of markdown.',
    },
    {   
        user_id: 1,
        title: 'JavaScript, the future of computing',
        description: 'JS is the most commonly used programming language',
    },
    {   
        user_id: 2,
        title: 'Node.js vs Express.js',
        description: 'Backend',
    }
]


const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;