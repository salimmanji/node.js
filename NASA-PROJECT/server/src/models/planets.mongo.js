const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        requried: true,
    }
});

module.exports = mongoose.model('Planet', planetSchema);