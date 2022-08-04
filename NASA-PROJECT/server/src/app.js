const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

const app = express();

app.use(cors({
    origin: 'http://localhost:8000',
}));

app.use(morgan('combined'));
app.use(express.json()); // parse any json from incoming requests middleware
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static site with assets in server/public

app.use('/v1', api);
// app.use('/v2', v2Router);  <-- if anoter version was available, now supporting both

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); //change the route here
});

module.exports = app;