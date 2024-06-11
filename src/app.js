const express = require('express');
const app = express();
const cors = require('cors');
const  path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const passport = require('passport');
const { Strategy } = require('passport-openidconnect');

require('dotenv').config();

// logger
const { requestLogger } = require('./support/logger');

// error handler
require('express-async-errors');

const {
  errorHandler,
  badJsonHandler,
  notFoundHandler,
} = require('./middlewares');

const {
  glob,
  globSync,
  globStream,
  globStreamSync,
  Glob,
} = require('glob')
let viewPaths = glob.sync('src/modules/**/views').map(folderpath => {
  return path.join(__dirname, folderpath.substring(4, folderpath.length).replace(/\\/g,'/'));
});
if(process.platform === "win32"){
// view engine setup window 
viewPaths = glob.sync('src/modules/**/views').map(folderpath => {
  return path.join(__dirname, folderpath.substring(4, folderpath.length).replace(/\\/g,'/'));
});
}else{
// view engine setup linux
viewPaths = glob.sync(path.join(__dirname,'/modules/**/views/')).map(folderpath => {
  return folderpath.substring(0, folderpath.length).replace(/\\/g,'/');
});
}
viewPaths.push(path.join(__dirname, 'views'))
app.set('views', viewPaths);
app.set('view engine', 'pug');

app.set('trust proxy', 1) // trust first proxy

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('testtestettetetetetesdfgsdfs55040534t'));
app.use(express.static(path.join(__dirname, 'public')));


// enable cors
app.use(cors());

app.use(requestLogger);

// parse json body
app.use(express.json());

// handle bad json format
app.use(badJsonHandler);

app.use(session({  
  name: `travel_portal`,
  secret: 'testtestettetetetetesdfgsdfs55040534t', 
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, // This will only work if you have https enabled!
    maxAge: 3600000, // 1 hrs,
    store: new session.MemoryStore,
  } 
}));

app.use(passport.initialize());
app.use(passport.session());

// set up passport
passport.use('oidc', new Strategy({
  issuer: 'https://ssaihq.okta.com/oauth2/default',
  authorizationURL: 'https://ssaihq.okta.com/oauth2/v1/authorize',
  tokenURL: 'https://ssaihq.okta.com/oauth2/default/v1/token',
  userInfoURL: 'https://ssaihq.okta.com/oauth2/default/v1/userinfo',
  clientID: '0oajv9kkh13BGRZuz4x7',
  clientSecret: 'eQO1E-a5DR2Axmge6Bz5bAAKkfI6VAioQS05HoOrdW4MLW4DdO0o5dwiXAx_7uNd',
  callbackURL: 'https://tr.ssai.app/authorization-code/callback',
  scope: 'openid profile'
}, (issuer, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});

app.use('/okta-login', passport.authenticate('oidc'));
app.use('/authorization-code/callback',
  passport.authenticate('oidc', { failureMessage: true, failWithError: true }),
  (req, res) => {
    res.redirect('/request');
  }
);

app.use(flash());
// Load express-toastr
// You can pass an object of default options to toastr()
app.use(toastr({closeButton: true}));

app.use(function (req, res, next)
{
    res.locals.toasts = req.toastr.render()
    next()
});

// load routes
require('./loaders/routes')(app);

// load and validate env variables
require('./loaders/config');

// handle 404 not found error
app.use(notFoundHandler);

// catch all errors
app.use(errorHandler);
app.locals.moment = require('moment');
app.locals.globalRoot = __dirname;
app.use(function(req,res,next){
  app.locals.hostUrl = req.protocol + '://' + req.get('host')
  fs.readdir('/database/user/', (error, files) => {
    if (error) {
      console.log("error in read folder",error);
    } else {
      console.log("list of files ",files);
      console.log("Length of files ",files.length); 
    }
    // let fileContents = fs.readFileSync('/database/user/*.yaml', 'utf8');
    // let data = yaml.safeLoad(fileContents);
  });
  next();
});


module.exports = app;
