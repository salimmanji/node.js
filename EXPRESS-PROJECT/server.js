const express = require('express');
const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');

const app = express();

const PORT = 3000;

// const friends = [
//     {
//         id: 0,
//         name: 'Karl Marx'
//     },
//     {
//         id: 1,
//         name: 'Albert Einstein'
//     }
// ];

//Middleware
app.use((req, res, next) => {
    const start = Date.now(); //current time in ms since Jan1, 1970
    next(); //pass request to the next handler.
    //Additional code handled after the frame returns from the stack.
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());

app.post('/friends', friendsController.postFriend);
// (req, res) => {
//     if (!req.body.name) { //if no name, or no data (object doesn't exist)
//         return res.status(400).json({ //return json message object      //break execution!!
//             error: 'Missing friend name.'
//         }) //400 error, client side. 
//     }
//     const newFriend = {
//         id: friends.length,
//         name: req.body.name
//     }
//     friends.push(newFriend);
//     res.json(newFriend); //all responses return some JSON, regardless of the error/message.

// app.get('/friends', (req, res) => {
//     res.status(200).json(friends); //express automatically sets to application/json as content-type (vs text/html)
// })

app.get('/friends/:friendId', friendsController.getFriend);
// (req, res) => {
//     const friendId = Number(req.params.friendId);
//     const friend = friends[friendId];
//     if (friend) {
//         res.json(friend);   
//     } else { //manual 404 return
//         res.status(404).json({
//             error: "Friend does not exist"
//         });
//     }
// }

app.get('/friends', friendsController.getFriends);


app.get('/messages', messagesController.getMessages);

// (req, res) => {
//     res.send('<ul><li>Hello!!! Someone</li></ul>');
// }  Previous body for above.

app.post('/messages', messagesController.postMessage);
// (req, res) => {
//     console.log('... Updating messages...');
// } Previous body for above.

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});