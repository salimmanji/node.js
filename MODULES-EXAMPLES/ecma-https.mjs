import { send } from './ecma-request.mjs';
import { read } from './ecma-response.mjs';

function makeRequest(url, data) {
    send(url, data);
    //response.read(); 1
    return read(); //1
}

const repsonseData = makeRequest('https://google.com', 'hello');

console.log(repsonseData)