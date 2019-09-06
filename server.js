var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

/*
  Your request handler should send listingData in the JSON format as a response if a GET request
  is sent to the '/listings' path. Otherwise, it should send a 404 error.

  https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
  http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation

  http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4

  https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
 */
var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);

    if (request.method == 'GET' && parsedUrl.pathname == '/listings') {
        response.end(JSON.stringify(listingData));
    }
    else {
        response.writeHead('404');
        response.end('Bad gateway error');
    }
};

/*
  This callback function should save the data in the listingData variable,
  then start the server.

  HINT: Check out this resource on fs.readFile
  //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

  HINT: Read up on JSON parsing Node.js
 */
fs.readFile('listings.json', 'utf8', function(err, data) {

    if (err) throw err;

    listingData = JSON.parse(data);

    var server = http.createServer(requestHandler);

    //Start the server
    server.listen(port, function() {
        console.log('Server is listening on http://localhost:' + port);
    });

});
