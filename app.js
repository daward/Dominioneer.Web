'use strict';

var SwaggerExpress = require('swagger-express-mw');
var swaggerUiMiddleware = require('swagger-ui-middleware');
var YAML = require('yamljs');

var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  console.log(__dirname+'/swagger')
  swaggerUiMiddleware.hostUI(app, {path: '/swagger', overrides: __dirname+'/swagger'});
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 3000;
  app.listen(port);
  
  app.get('/api/swagger/swagger.json', function(req, res)
  {
		YAML.load('api/swagger/swagger.yaml', function(result)
		{
			res.send(result);
		});  
  });
});
