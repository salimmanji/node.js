const http = require('http');

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: "Nikola Tesla"
    },
    {
        id: 1,
        name: "Sir Isaac Newton"
    },
    {
        id: 2,
        name: "Albert Einstein"
    }
]

const server = http.createServer((req, res) => {
    const items = req.url.split('/');
    // /friends/2 --> ['', friends, 2]
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
            console.log(`Request: ${data.toString()}`);
            friends.push(JSON.parse(data.toString()));
            
        });
        req.pipe(res);
    } else if (req.method === 'GET' && items[1] === 'friends') { //if (req.url === '/friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (items.length === 3) {
            res.end(JSON.stringify(friends[Number(items[2])]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Isaac </li>');
        res.write('<li>What are your thoughts on astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port# ${PORT}`);
});