/**
 * Created by Sinan on 2/24/16.
 */
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile (str, path) {
    return stylus(str).set('filename', path);
}


app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Express will look into the public repo for routing /something (instead of /public/somehting). This is static route handlign
app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req,res) {
    console.log('partial route');
    res.render('partials/' + req.params.partialPath);
});

// All routes render the index page. Then routing handled in the angular app
app.get('*', function (req, res) {
    console.log('********** route');
    res.render('index');
});

var port = 3030;
// Tell the server to listen to requests
app.listen(port);
console.log('Listening on port '+port+'...');