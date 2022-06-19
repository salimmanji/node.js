//const request = require('./request'); //require function by default looks for .js extensions. Set by global require object.  repl require.extensions 
//const response = require('./response'); 1
//const read = require('./response'); // 1 by only exporting the read function in response.js, assign the function, and call it directly.

const { read } = require('./response')
const { send } = require('./request')

function makeRequest(url, data) {
    send(url, data);
    //response.read(); 1
    return read(); //1
}

const repsonseData = makeRequest('https://google.com', 'hello');

console.log(repsonseData)