//Import Express module
var express = require("express"); 

//Creating En express appliction
var app = express(); 

//Enable application to serve static files via middleware
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
console.log("Server running at Port 3000"); 