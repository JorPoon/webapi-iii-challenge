const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();

// this only runs if the url has /api/users in it
router.get('/', async (req, res) => {
    try {
        const users = await Users.get(req)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error retreiving users'
        })
    }
    // Users
    // .get('users')
    // .then(user => {
    //     res.status(200).json(user)
    // })
    // .catch(error => {
    //     res.status(500).json({error: 'The user information cannot be retrieved'})
    // });
})

module.exports = router;