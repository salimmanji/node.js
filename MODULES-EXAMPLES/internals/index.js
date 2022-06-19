const request = require('./request');
const response = require('./response');

// module.exports = {
//     request: require('./request'),
//     response: require('./response'),
// }; 2

module.exports = {
    REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
    send: request.send,
    read: response.read
};

//spread operator - takes all functions in the require files and exports them using the same name.
// need to comment out lines # 1 & 2
// module.exports = {
//     ...require('./request'),
//     ...require('./response')
// }