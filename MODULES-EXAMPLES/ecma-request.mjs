const REQUEST_TIMEOUT = 500; //<-- shorthand

function encrypt(data) {
    return 'encrpypted data';
}

function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData} to ${url}`);
}

export {
    REQUEST_TIMEOUT,
    send
};
