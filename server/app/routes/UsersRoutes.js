const express = require('express');
const router = express.Router();

const users  = require('../controllers/UsersController');

router.get('/get', users.getUsers);
router.post('/create', users.createUser);

module.exports = router;