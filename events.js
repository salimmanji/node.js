const EventEmitter = require('events');
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1
celebrity.on('race', (result)  => {
    if (result === 'win')
        console.log('Congrats on your victory!');
});

// Subscribe to celebrity for Observer 1
celebrity.on('race', (result)  => {
    if (result === 'lost')
        console.log('What a shame!');
});

// Subscribe to celebrity for Observer 2
celebrity.on('race', (result)  => {
    if (result === 'win')
        console.log('Caramba, Tintin again!\n');
});

// code is the exit code, global? Node emits event when its ready to exit, and exits after the callback. 
process.on('exit', (code) => {
    console.log(`Process exit event with code: ${code}`)
});

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');

