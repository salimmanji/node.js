// const express = require('express');
// const app = express();
// app.listen();

const http = require('http'); // Node built in http request object

const app = require('./app')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); //pass express into it. Any middleware will also be passed along

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
