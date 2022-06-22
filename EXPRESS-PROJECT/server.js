const express = require('express');
const path = require('path');

const friendRouter = require('./routes/friend.router');
const messageRouter = require('./routes/message.router');

const app = express();

const PORT = 3000;


//Middleware
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public'))); //website in public folder.    <-- serves all files under one specific path.
// /site allows for a static page
app.use(express.json());

//allow friendsRouter to be used as middleware.
//mounting friendsRouter on the app object.
//shared network path allows for substitution
app.use('/friends', friendRouter);
app.use('/messages', messageRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});