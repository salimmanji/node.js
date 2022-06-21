const model = require('../models/friends.model');

function postFriend(req, res) {
    if (!req.body.name) { //if no name, or no data (object doesn't exist)
        return res.status(400).json({ //return json message object      //break execution!!
            error: 'Missing friend name.'
        }) //400 error, client side. 
    }
    const newFriend = {
        id: model.length, //friends array
        name: req.body.name
    }
    // friends.push(newFriend); after moving and creating the friends.model.js file to store database, need to update name.
    model.push(newFriend);
    res.json(newFriend); //all responses return some JSON, regardless of the error/message.
}


function getFriend(req, res) {
    const friendId = Number(req.params.friendId);
    const friend = model[friendId]; //friends[friendId];
    if (friend) {
        res.json(friend);   
    } else { //manual 404 return
        res.status(404).json({
            error: "Friend does not exist"
        });
    }
}

function getFriends(req, res) {
    res.json(model);
}

module.exports = {
    postFriend,
    getFriends,
    getFriend
}