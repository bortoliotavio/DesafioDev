var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var hbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
const { insertUser } = require('./models/userModel');

var loginRouter = require('./routes/login');
var errorRouter = require('./routes/404');
var blankRouter = require('./routes/blank');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var registerRouter = require('./routes/register');
var forgotPasswordRouter = require('./routes/forgot-password');
var usersRouter = require('./routes/users');

var app = express();



app.set('view engine', 'hbs');
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'product',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: "mysecret" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', loginRouter);

app.use('/404', errorRouter);
app.use('/blank', blankRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/register', registerRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404', { layout: 'logged' });
});

module.exports = app;
