const { User } = require('../models');

const userData = [
    {
        username: 'easymoneysniper',
        email: 'kevindurant@email.com',
        password: 'password12345'
    },
    {
        username: 'paulgeorge',
        email: 'paulgeorge@email.com',
        password: 'password12345',
    },
    {
        username: 'kingjames',
        email: 'lebronjames@email.com',
        password: 'password12345',
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;