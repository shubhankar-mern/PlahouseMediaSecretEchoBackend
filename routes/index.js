const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');
router.post('/auth/signup', authController.register);
router.post('/auth/login', authController.login);
router.post('/new-chat', auth, messageController.createNewChat);
router.get('/get-chats', auth, messageController.getChats);
router.get('/get-chat/:id',auth, messageController.getChat);
router.delete('/delete-chat/:id',auth, messageController.deleteChat);




module.exports = router;