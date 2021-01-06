var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const authUtils = require('./util/authUtils');

var indexRouter = require('./routes/index');
const consultantRouter = require('./routes/consultantRoute');
const projectRouter = require('./routes/projectRoute');

const consApiRouter = require('./routes/api/ConsultantApiRoute');
const projectApiRouter = require('./routes/api/ProjectApiRoute');
//const cons_ProjectApiRouter = require('./routes/api/Cons_ProjectApiRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});



//app.use('/consultants', authUtils.permitAuthenticatedUser, consultantRouter);
//app.use('/projects', authUtils.permitAuthenticatedUser, projectRouter);

app.use('/consultants', authUtils.permitAuthenticatedUser, consultantRouter);
app.use('/projects', authUtils.permitAuthenticatedUser, projectRouter);
app.use('/', indexRouter);

app.use('/api/consultants', consApiRouter);
app.use('/api/projects', projectApiRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
