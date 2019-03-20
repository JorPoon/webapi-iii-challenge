const express = require('express');

const Posts = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req)
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error retreiving posts'
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

router.get('/:id', async (req,res) => {
    try {
        const postId = await Posts.getById(req.params.id);
        if (postId) {
            res.status(200).json(postId)
        } else {
            res.status(404).json({message: `User's posts not found`})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting posts'
        })
    }
})

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await Users.getById(req.params.id);

//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({message: 'User not found'});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             error: 'Error retrieving user'
//         })
//     }
// });

router.post('/', async (req, res) => {
    try {
        const addPost =  await Posts.insert(req.body);
        res.status(201).json(addPost);
    } catch (error) {
        res.status(500).json({
            Error: 'Error adding post'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const rmPost = await Posts.remove(req.params.id);
        if (rmPost) {
            res.status(200).json({message: 'Post has been deleted'})
        } else {
            res.status(404).json({error: 'Post cannot be found'})
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
      const postUpdate = await Posts.update(req.params.id, changes);
      if (postUpdate) {
        res.status(200).json(postUpdate);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });





module.exports = router;