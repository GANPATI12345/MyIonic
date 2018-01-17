 "use strict";
var express = require('express');
var httpLogger = require('morgan')('dev');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
mongoose.Promise = Promise;
var winston = require('winston');
var app = express();
var cors = require('cors');
var multer = require('multer');
global.projectHome = __dirname;
global.moment = require("moment");
let _ = require('lodash');
let config = require('./config/config.json')
var compression = require('compression');
var cookieParser = require('cookie-parser');

//global dependencies
global.mongoose = mongoose;
global.express = express;
global.path = require('path');
global.winston = winston;
global.promise = Promise;
global.async = require('async');
var http = require('http');

/****** Indian Time Zone ******/
process.env.TZ = 'Asia/Kolkata';
console.log(new Date());

global.NODE_ENV = process.env.NODE_ENV || 'development';
if (!NODE_ENV) {
    console.log("Please set your system's environment on this project !!");
}

app.configureHeaders = function () {
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Max-Age', '86400');
        res.header('Access-Control-Allow-Headers',
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        next();
    });
};

app.configureUtilities = function () {
    app.use(httpLogger);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
  //  app.use(cookieParser());
    app.use(cors());
    app.use(compression());
};

app.setupDB = function () {
    let Uri = "mongodb://";
    if (NODE_ENV == 'development') {
        let dev = config.production.mongoDB
        Uri = Uri + dev.host + ":" + dev.port + "/" + dev.db;
    }
    else if (NODE_ENV = "production") {
        let prod = config.production.mongoDB
        var url = Uri + prod.user + ":" + prod.password + "@" + prod.host + ":" + prod.port + "/" + prod.db;
    }
    mongoose.connect(Uri, function (err) {
        if (err) return console.log('app.js err ' + err);
        return console.log('Connected to MongoDB ' + Uri);
    });
};

app.initialize = function () {
    app.configureUtilities();
    app.setupDB();
    app.configureHeaders();
   }();

// process.on('unhandledRejection', (err) => {
//     console.error(err)
//     process.exit(1)
// })

// process.on('uncaughtException', function (err) {
//     console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
//     console.error(err.stack)
//     process.exit(1)
// })

// var cluster = require('cluster');

// var workers = process.env.WORKERS || require('os').cpus().length;

// if (cluster.isMaster) {

//     console.log('start cluster with %s workers', workers);

//     for (var i = 0; i < workers; ++i) {
//         var worker = cluster.fork().process;
//         console.log('worker %s started.', worker.pid);
//     }

//     cluster.on('exit', function (worker) {
//         console.log('worker %s died. restart...', worker.process.pid);
//         cluster.fork();
//     });

// } else {
//     http.createServer(function (req, res) {
//         res.end("Look Mum! I'm a server!\n");
//     }).listen(3000)

// }

var index = require('./route/index.js')(app)

var server = app.listen(8080, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
    res.end("welcome to Bucket! ");
});