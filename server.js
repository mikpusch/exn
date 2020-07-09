var local = true;

// call the packages we need
var express    = require('express');        
var app        = express();                 
var mongoose   = require('mongoose');

var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';



// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
}

if (local){
	ip='127.0.0.1';
	port = 3000;
	url = 'mongodb://localhost/playground';
}

// Connect to mongodb
var connect = function () {
    mongoose.connect(url);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});

db.on('disconnected', connect);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);