const express = require('express');
const router = express.Router();
const { getTopUsers } = require('../controllers/usersController');

router.get('/', getTopUsers);

module.exports = router;