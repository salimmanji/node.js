function getMessages(req, res) { //named function give additional logging. Arrow function is anonymous, and won't debug.
    res.send('<ul><li>Hello!!! Someone</li></ul>');
}

function postMessage(req, res) {
    console.log('... Updating messages...');
}

module.exports = {
    getMessages,
    postMessage
}