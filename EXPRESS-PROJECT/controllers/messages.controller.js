const path = require('path'); //any OS path systems.

function getMessages(req, res) { //named function give additional logging. Arrow function is anonymous, and won't debug.
    //res.send('<ul><li>Hello!!! Someone</li></ul>');
    // path.join(__filename, '..', 'public', 'Mario.jpg'); // join all the folders together, and substitute delim char later      __dirname points to controllers folder from OS
    //res.sendFile( path.join(__dirname, '..', 'public', 'images', 'Mario.jpg')); //express changes content type, based on file name /// update path
    res.render('messages', {
        title: 'Messages to my Friends!',
        friend: 'Elon Musk'
    });
};

function postMessage(req, res) {
    console.log('... Updating messages...');
}

module.exports = {
    getMessages,
    postMessage
}