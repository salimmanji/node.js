function decrypt(data) { //private - not exported
    return 'decrypted data';
}

function read() { //public interface
    return decrypt('data')
}

export {
    read
}