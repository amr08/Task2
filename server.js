var express = require("express");
var path = require("path");

var PORT = process.env.PORT || 5000;

var app = express();

var page_controller = require("./controllers/page_controller");

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.use("/", page_controller);

app.listen(PORT, function(){
  console.log('App listening on PORT ' + PORT);
});