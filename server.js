// The simplest implementation of a HTTP server.
var http = require('http');
// Providing middleware capabilities
var connect = require('connect');
// Used to route HTTP requests in our web server.
var HttpDispatcher = require('httpdispatcher');

var dispatcher = new HttpDispatcher();

var app = connect();

// Callback executed on every request
app.use(function(request, response) {
    dispatcher.dispatch(request, response);
});

var server = http.createServer(app);

dispatcher.onGet('/', function(request, response) {
    response.end('The simplest http server one can create');
})

dispatcher.onError(function(request, response) {
    response.writeHead(404);
    response.end('The server could not route your request');
})

server.listen(process.argv[2], function() {
    console.log(`Server started on port ${process.argv[2]}`);
})