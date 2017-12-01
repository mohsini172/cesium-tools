var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));


// start server on the specified port and binding host
app.listen(8080 , '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on 8080");
});