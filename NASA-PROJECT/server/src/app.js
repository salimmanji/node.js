const express = require('express');

const app = express();
app.use (express.json()); // parse any json from incoming requests

module.exports = app;