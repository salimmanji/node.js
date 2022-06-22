const express = require('express');

const friendController = require('../controllers/friends.controller');

const friendRouter = express.Router();

friendRouter.use((req, res, next) => {
    console.log(`IP address: ${req.ip}`);
    next();
});
friendRouter.post('/', friendController.postFriend);
friendRouter.get('/:friendId', friendController.getFriend);
friendRouter.get('/', friendController.getFriends);

module.exports = friendRouter;