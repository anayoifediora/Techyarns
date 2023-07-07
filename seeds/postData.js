const { Post } = require('../models');

const postData = [
    {
        title: 'Evolution of HTML',
        description: 'HTML, also known as Hypertext Markup Language is a type of markdown.',
    },
    {
        title: 'JavaScript, the future of computing',
        description: 'JS is the most commonly used programming language',
    },
    {
        title: 'Node.js vs Express.js',
        description: 'Backend',
    }
]


const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;