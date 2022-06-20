const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'Karl Marx'
    },
    {
        id: 1,
        name: 'Albert Einstein'
    }
];

app.get('/friends', (req, res) => {
    res.status(200).json(friends); //express automatically sets to application/json as content-type (vs text/html)
})

app.get('/friends/:friendId', (req, res) => {
    const friendId = Number(req.params.friendId);
    const friend = friends[friendId];
    if (friend) {
        res.json(friend);   
    } else { //manual 404 return
        res.status(404).json({
            error: "Friend does not exist"
        });

    }
})


app.get('/messages', (req, res) => {
    res.send('<ul><li>Hello!!! Someone</li></ul>');
})

app.post('/messages', (req, res) => {
    console.log('... Updating messages...');
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})