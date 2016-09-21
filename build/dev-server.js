
var express = require('express')
var path = require('path')
var port = 8080

var config = require("./webpack.demo.config.js");
var webpack = require('webpack');
var path = require('path')
var compiler = webpack(config);

var watch = require('watch')

var serverWorking = false;
var timer = null;
var waitTime = 500;


watch.watchTree(path.join(__dirname, '../demo'), {
    interval: 300, 
    ignoreDirectoryPattern: /dist/
}, function(f){
    if(typeof f !== 'string')return;
    console.log('file ' + f + ' change!');
    build();
})

build();

function build(){
    compiler.run(function(err, stats){
        if (err) {
            console.log(err)
            return
        }
        console.log('webpack buid completed! please refresh your browser!');
        if(!serverWorking)startServer();
    });
}

function startServer(){
    var app = express();
    app.use(express.static(path.join(__dirname, '../demo')));
    app.listen(port, function (err) {
        if (err) {
            console.log(err)
            return
        }
        serverWorking = true;
        console.log('Listening at http://localhost:' + port + '\n')
    })
}
