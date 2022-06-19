//const request = require('./request'); //require function by default looks for .js extensions. Set by global require object.  repl require.extensions 
//const response = require('./response'); 1
//const read = require('./response'); // 1 by only exporting the read function in response.js, assign the function, and call it directly.

// const { read } = require('./internals/response')
// const { send } = require('./internals/request')
// const internals = require('./internals'); // request module defined in internals/index.js 3
const {send, read } = require('./internals'); // destructure functions from 3

function makeRequest(url, data) {
    //internals.request.send(url, data);2 
    //internals.send(url, data); 3 
    send(url, data); // 3 after destructuring
    //response.read(); 1
    //return internals.response.read(); //1
    //return internals.response.read(); 2
    //return internals.read(); 3
    return read(); //3 after destructuring
}

const repsonseData = makeRequest('https://google.com', 'hello');

console.log(repsonseData)