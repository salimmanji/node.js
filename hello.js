const mission = process.argv[2];

if (mission === 'learn') {
    console.log('Time to write some node code!');
} else {
    console.log(`Is ${mission} really more fun?`);
}


process.argv.forEach(a => {
    console.log(a)
});

//node hello.js explore

