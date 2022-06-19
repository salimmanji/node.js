function decrypt(data) { //private - not exported
    return 'decrypted data';
}

module.exports.read = function read() { //public interface
    return decrypt('data')
}

// module.exports = {
//     read,
// }