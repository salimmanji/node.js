const axios = require('axios');

axios.get('https://www.wikipedia.org')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    })
    .then( () => {
        console.log('All done!');
    });