// Incluímos las dependencias que vamos a usar


var express = require("express"),
    path = require('path'),
    config = require('./libs/config'),
    log = require('./libs/logs')(module),
    http = require('http'),
    fs = require('fs'),
    app  = express();

// Configuramos la app para que pueda realizar métodos REST
app.configure(function () {
    app.use(express.logger('dev')); // log all requests
    app.set('views', __dirname + '/views');
   

    // app.set('view engine', 'jade');
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');

    // assign the swig engine to .html files
    // app.engine('html', require('ejs').renderFile);

    // set .html as the default extension



    // app.set('view engine', 'jade');
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');
    // app.set('views', __dirname + '/views');

    // var engines = require('consolidate');
    // app.engine('jade', require('jade').__express);
    // app.engine('html', require('ejs').renderFile);
    
    // app.engine('haml', engines.haml);
    // app.engine('html', engines.hogan);

    // app.engine('jade', engines.jade);
    // app.engine('html', engines.ejs);
    // assign the swig engine to .html files
    app.set('views', __dirname + '/views');
    var engines = require('consolidate');
    // app.engine('jade', engines.jade);
    app.engine('jade', require('jade').__express);
    app.engine('html', require('ejs').renderFile);
    // set .html as the default extension
    app.set('view engine', 'html');

    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.urlencoded());
    app.use(express.session({ secret: 'secretochelo' }));
    app.use(require('stylus').middleware({ src: __dirname + '/public' }));
    app.use(express.static(__dirname + '/public'));
});

// Routes
routes = require('./routes/route')(app, log);

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.server = http.createServer(app);
app.server.listen(config.get('port'), function() {
    console.log("Node server running on https://localhost:" + config.get('port'));
});
