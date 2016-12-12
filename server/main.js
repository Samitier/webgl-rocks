let express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    compress     = require('compression'),

    routes       = require('./routes'),

    app          = express()


app.use(compress())
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public'), {maxAge: 31536000}))


//// ROUTE HANDLERS ////

app.use('/api', routes)

app.use((req, res) => res.sendFile(path.join(__dirname, '../public/index.html')))

//// ERROR HANDLERS ////

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error:   (process.env.ENV === 'development') ? err : {}
    });
});

////////////////

let debug = require('debug')('instadrink:server'),
    http  = require('http'),
    port  = normalizePort(process.env.PORT || '3000')

app.set('port', port)

let server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
    var port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break;
        default:
            throw error
    }
}

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}
