//module.exports.REQUEST_TIMEOUT = 500;
exports.REQUEST_TIMEOUT = 500; //<-- shorthand

function encrypt(data) {
    return 'encrpypted data';
}

module.exports.send = function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData} to ${url}`);
}

// module.exports = {
//     //send: send,                   <== shorthand if the function name is mapping to the same name.
//     REQUEST_TIMEOUT,
//     send,
// }