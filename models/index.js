const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'post_id',
})

Post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'post_id',
})

module.exports = { User, Post, Comments };