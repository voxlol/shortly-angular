var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter = express.Router();
  var linkRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));


  app.use('/api/users', userRouter); // use user router for all user request

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/api/links', linkRouter); // user link router for link request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.use('/*', function(req, res, next){
    var code = req.params[0];
    res.redirect('/api/links/'+code);
    // req.path = '/api/links/code'
  }, linkRouter)
  // check the url, see if its a code in the links db

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../links/linkRoutes.js')(linkRouter);
};
