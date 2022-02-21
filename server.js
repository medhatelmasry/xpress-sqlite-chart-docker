const express = require("express")
const app = express()
const path = require('path');
const config = require('./config');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var index = require("./routes/");
var students = require("./routes/students");

app.use(express.static(path.join(__dirname, 'public')));

// enable CORS
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

app.use("/", index);
app.use("/api", students);

// Start server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});