const express = require('express');
// const upperCase = require('upperCase')

const Users = require('../data/helpers/userDb');

const router = express.Router();

function cap(req, res, next) {
    const letters = req.body
    if(letters === letters.toUpperCase()) {
        next();
    } else {
        res.status(403).send('Your name needs to be all capitilize')
    }
}

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

router.get('/:id/posts', async (req,res) => {
    try {
        const userPosts = await Users.getUserPosts(req.params.id);
        if (userPosts) {
            res.status(200).json(userPosts)
        } else {
            res.status(404).json({message: `User's post not found`})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting posts'
        })
    }
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

router.post('/', cap, async (req, res) => {
    try {
        const user =  await Users.insert(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            Error: 'Error adding the user'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await Users.remove(req.params.id);
        if (user) {
            res.status(200).json({message: 'User has been deleted'})
        } else {
            res.status(404).json({error: 'User cannot be found'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error removing user'
        })
    }
})

router.put('/:id', async (req, res) => {
    const changes = req.body;
    try {
      const userUpdate = await Users.update(req.params.id, changes);
      if (userUpdate) {
        res.status(200).json(userUpdate);
      } else {
        res.status(404).json({ message: 'The User could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the user',
      });
    }
  });

module.exports = router;