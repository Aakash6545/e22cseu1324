const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
app.use(cors('*'));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

module.exports = app;