'use strict';

var SwaggerExpress = require('swagger-express-mw'),
	swaggerUiMiddleware = require('swagger-ui-middleware'),
	YAML = require('yamljs'),
    passport = require('passport'),
	BearerStrategy = require('passport-http-bearer').Strategy,
	User = require('./user.js');

var express = require('express');
var app = express();
module.exports = app; // for testing
app.use(express.static('assets'));

passport.use(new BearerStrategy(
  function(token, done) {
    User.getUser(token, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));

var config = {
  appRoot: __dirname // required config
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  console.log(__dirname+'/swagger')
  swaggerUiMiddleware.hostUI(app, {path: '/swagger', overrides: __dirname+'/swagger'});
  // install middleware
  
	swaggerExpress.sysConfig.securityHandlers = {
	   rating_auth: function(req, def, scopes, callback) {
		  passport.authenticate('bearer', function(err, user, info) {
			 if(err){
				callback(new Error('Error in passport authenticate'));
			 }
			 if(!user){
				callback(new Error('Failed to authenticate oAuth token'));
			 }

			 req.user = user;
			 return callback();
		  })(req, null, callback);
	   }
	};
  
  swaggerExpress.register(app);

  var port = process.env.PORT || 80;
  app.listen(port);
  
  app.get('/api/swagger/swagger.json', function(req, res)
  {
		YAML.load('api/swagger/swagger.yaml', function(result)
		{
			res.send(result);
		});  
  });
});
