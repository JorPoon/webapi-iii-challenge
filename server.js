const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./posts/posts-router.js');

const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/users', usersRouter);
//server.use('/api/users/:id/posts', postsRouter);
server.use('/api/posts', postsRouter)

module.exports = server;
