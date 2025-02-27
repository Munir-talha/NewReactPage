const express = require('express');
const { login, getAllUsers, updateUser, AddUser, DeleteUser } = require('../controllers/UserController');
const router = express.Router();
const { authenticateToken } = require('../middlewares/JWTAuthenticate'); // Use destructuring here

router.post('/login', login);
router.get('/getAll', authenticateToken, getAllUsers);
router.post('/update', authenticateToken, updateUser);
router.post('/AddUser', authenticateToken, AddUser);
router.post('/deleteUser', authenticateToken, DeleteUser);

module.exports = router;
