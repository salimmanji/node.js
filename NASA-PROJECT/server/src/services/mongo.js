const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://salim:G00glemongo@nasacluster.cowxh.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.on('open', () => {
    console.log(`MongoDB Connection ready!`);
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
   await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}