const express = require('express');
const app = express();
const cors = require('cors');
const pug = require('pug');
const  path = require('path');
const yaml = require('js-yaml');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const toastr = require('express-toastr');

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
  resave: true,
  saveUninitialized: false,
  cookie: { 
    secure: false, // This will only work if you have https enabled!
    maxAge: 600000 // 10 min
  } 
}));
app.use(flash());
 
// Load express-toastr
// You can pass an object of default options to toastr()
app.use(toastr());

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
