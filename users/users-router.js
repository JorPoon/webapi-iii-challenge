const express = require('express');

const Users = require('../data/helpers/userDb');

const router = express.Router();

// this only runs if the url has /api/users in it
router.get('/', async (req, res) => {
    try {
        const user = await Users.get(req)
        res.status(200).json(user);
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

router.get('/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Error retrieving user'
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await Users.insert(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            Error: 'Error adding the user'
        })
    }
})

module.exports = router;