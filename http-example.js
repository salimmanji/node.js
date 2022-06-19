//const http = require('http');                                                //http vs https protocol
//const req = http.request('http://www.google.com', (res) => {


//const http = require('https');
//const { request } = require('https');                                         //can access specific part of https module, no need to prefix request with http.requet(...)
const { get } = require('https');                                               //<-- only using get requests

//const req = http.request('https://www.google.com', (res) => {

//const req = request('https://www.google.com', (res) => { 
const req = get('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log(`Data chunk: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data.');
    });
});

req.end();