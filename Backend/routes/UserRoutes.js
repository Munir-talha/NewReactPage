const express = require('express');
const { login, getAllUsers, updateUser, AddUser } = require('../controllers/UserController');
const router = express.Router();

router.post('/login', login);
router.get('/getAll', getAllUsers);
router.post('/update', updateUser);
router.post('/AddUser', AddUser);

module.exports = router;