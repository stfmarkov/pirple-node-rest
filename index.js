/*
*   Primary file for the API
*/

//  Dependencies

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with string

const server = http.createServer( (req, res) => {

    // Get the URL and parese it 
    const parsedUrl = url.parse(req.url, true);
    
    // Get the path
    const path = parsedUrl.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as and obj
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload if there is any

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        
        // Send response
        res.end('Hello World\n')

        // Log the request path    
        console.log('Request received on path: ' + trimedPath + ' with method: ' + method + 'and with this query string params', queryStringObject);
        console.log('Request received with thise headers: ', headers);
        console.log('Request recieved with this payload: ', buffer)
    });

    
} );

// Start the server, and have it listen on port 3000
server.listen(3000, () => {
    console.log('The server is listening to 3000')
})