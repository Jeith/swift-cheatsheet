const createError = require('http-errors')
const express = require('express')
const Raven = require('raven')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const enforce = require('express-sslify')
// import ngrok from 'ngrok'
// const opener = require('opener')
require('dotenv').config()

// =======WEBPACK CONFIG====================
// import webpack from 'webpack'
// import config from '../webpack.config.prod.js'

const app = express()

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", 
//   "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Must configure Raven before doing anything else with it
Raven.config('https://2476947bcdb74b72bb403f79fc4c9c15@sentry.io/1278817').install()

// const compiler = webpack(config)
// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: config.output.publicPath
// }))

const indexRouter = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// The raven request handler must be the first middleware on the app
app.use(Raven.requestHandler())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }))

// Enforces HTTPS
app.use(enforce.HTTPS({ trustProtoHeader: true }))

//= =====ROUTES=============
app.use('/', indexRouter)

//= =====================================
//= ===========ERROR HANDLERS============
//= =====================================

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const port = 1337

app.listen(port, () => {
  console.log(`Listening on Port 1337!`)
  // (async function() {
  //   const url = await ngrok.connect(port);
  //   opener(url)
  // })()
  console.log(path.join(__dirname, 'views'))
})

module.exports = app