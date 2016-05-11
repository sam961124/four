var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var GooglePlusStrategy = require('passport-google-oauth2');
var routes = require('./routes/index');
var users = require('./routes/users');
var pconfig = require('./configuration/config'); // facebook config

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret:'four@group4',
    proxy:true,
    resave:true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/*config is our configuration variable.*/
passport.use(new FacebookStrategy({
    clientID: pconfig.fb_conf.facebook_api_key,
    clientSecret:pconfig.fb_conf.facebook_api_secret ,
    callbackURL: pconfig.fb_conf.callback_url,
    profileFields: ['id','name','email','photos']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(pconfig.fb_conf.use_database==='true')
      {
         //Further code of Database.

      }
      return done(null, profile);
    });
  }
));

passport.use(new GooglePlusStrategy({
    clientID:     pconfig.gp_conf.google_api_key,
    clientSecret: pconfig.gp_conf.google_api_secret,
    callbackURL:  pconfig.gp_conf.callback_url,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        if(pconfig.gp_conf.use_database==='true')
        {
           //Further code of Database.

        }
        //console.log(profile);
        return done(null, profile);
    });
  }
));



app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
