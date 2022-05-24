const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') { // if the file is not found return a 404 error 
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => { // read the file 404.html and pass the content to the callback function
                    res.writeHead(200, { 'Content-Type': 'text/html' }); // write the header of the response with the content type of text/html and the status code of 200
                    res.end(content, 'utf8'); // end the response and send the content to the client
                });
            } else {
                // Some server error
                res.writeHead(500); // write the header of the response with the status code of 500
                res.end(`Server Error: ${err.code}`); // end the response and send the error message to the client
            }
        }
        else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType }); // write the header of the response with the content type of text/html and the status code of 200
            res.end(content, 'utf8'); // end the response and send the content to the client
        }
    });
});

const PORT = process.env.PORT || 8000; // process.env.PORT is for heroku to set the port dynamically 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));