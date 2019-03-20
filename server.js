const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./posts/posts-router.js');

const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/users', usersRouter);
//server.use('/api/users/posts', postsRouter);

module.exports = server;
