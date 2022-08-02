// const express = require('express');

// const app = express();

// function delay(duration) {
//     const startTime = Date.now();
//     while(Date.now() - startTime < duration) {
//         //event loop blocked...
//     } 
// }

// app.get('/', (req, res) => {
//     res.send('Performance Example')
// });

// app.get('/timer', (req, res) => {
//     // delay response
//     delay(9000);
//     res.send('ding ding ding!');
// });

// app.listen(3000);

// const express = require('express');
// const cluster = require('cluster');

// const app = express();

// function delay(duration) {
//     const startTime = Date.now();
//     while(Date.now() - startTime < duration) {
//         //event loop blocked...
//     } 
// }

// app.get('/', (req, res) => {
//     res.send(`Performance Example: ${process.pid}`);
// });

// app.get('/timer', (req, res) => {
//     // delay response
//     delay(9000);
//     res.send(`ding ding ding!: ${process.pid}`);
// });

// console.log('running server.js...')
// if(cluster.isMaster) {
//     console.log('Master has been started...');
//     cluster.fork();
//     cluster.fork();
// } else {
//     console.log('Worker has been started...');
//     app.listen(3000);
// }

// const express = require('express');
// const cluster = require('cluster');
// const os = require('os');

// const app = express();

// function delay(duration) {
//     const startTime = Date.now();
//     while(Date.now() - startTime < duration) {
//         //event loop blocked...
//     } 
// }

// app.get('/', (req, res) => {
//     res.send(`Performance Example: ${process.pid}`);
// });

// app.get('/timer', (req, res) => {
//     // delay response
//     delay(9000);
//     res.send(`ding ding ding!: ${process.pid}`);
// });

// console.log('running server.js...')
// if(cluster.isMaster) {
//     console.log('Master has been started...');
//     const NUM_WORKERS = os.cpus().length;
//     for (let i = 0; i < NUM_WORKERS; i++) {
//         cluster.fork();
//     }
// } else {
//     console.log('Worker has been started...');
//     app.listen(3000);
// }

//PM2
const express = require('express');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while(Date.now() - startTime < duration) {
        //event loop blocked...
    } 
}

app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    // delay response
    delay(4000);
    res.send(`Beep beep beep! ${process.pid}`);
});

console.log('running server.js...')
console.log('Worker has been started...');
app.listen(3000);