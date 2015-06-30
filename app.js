'use strict';

var SwaggerExpress = require('swagger-express-mw'),
	swaggerUiMiddleware = require('swagger-ui-middleware'),
	YAML = require('yamljs');

var app = require('express')();
module.exports = app; // for testing

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
