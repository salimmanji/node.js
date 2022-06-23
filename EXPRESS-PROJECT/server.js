const express = require('express');
const path = require('path');

const friendRouter = require('./routes/friend.router');
const messageRouter = require('./routes/message.router');

const app = express();

app.set('view engine', 'hbs'); //set hbs as template engine
app.set('views', path.join(__dirname, 'views')); //use path.join to find the views stored in the views directory.

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

app.get('/', (req, res) => {
    res.render('index', { //rendering handlebars file called index. passing in an object that contains the variables we want filled in.
        title: "It's a Me!",
        caption: `Let's go skiing!`
    }); 
});

//allow friendsRouter to be used as middleware.
//mounting friendsRouter on the app object.
//shared network path allows for substitution
app.use('/friends', friendRouter);
app.use('/messages', messageRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});