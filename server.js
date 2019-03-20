const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./router/posts-router.js');

const usersRouter = require('./router/users-router.js');

const server = express();

//custom middleware
// function cap(req, res, next) {
//     if(req === req.toUpperCase()) {
//         next();
//     } else {
//         res.status(403).send('Your name needs to be all capitilize')
//     }
// }

server.use(express.json());
server.use(helmet());
//server.use(cap);

server.use('/api/users', usersRouter);
//server.use('/api/users/:id/posts', postsRouter);
server.use('/api/posts', postsRouter)

module.exports = server;
