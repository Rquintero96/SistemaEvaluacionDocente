//Inicio de Hapi
var Hapi = require('hapi')
//Inicio de Vision
var Vision = require('vision')
//Controaldores
var controllers = require('./controllers')
//Modelos
var models = require('./models')
//Inicializa el modulo de autentificacion
var BasicAuth = require('hapi-auth-basic')
//y esta es la herramienta para las validaciones a usar
var Bcrypt = require('bcrypt')
//Modulo para almacenar informacion a traves de la pagina
var CookieAuth = require('hapi-auth-cookie')  
//creando nuevo servidor
var server = new Hapi.Server()
//DB.js
var DB=require("./lib/DB.js");
///DEMOSTRACION///
// hardcoded users object … just for illustration purposes
var users = {  
  future: {
    id: '1',
    username: 'future',
    password: '$2a$04$YPy8WdAtWswed8b9MfKixebJkVUhEZxQCrExQaxzhcdR2xMmpSJiG'  // 'studio'
  }
}
///FIN///

//Conexion del servidor
server.connection({
	port: 8080
});

server.register([
  {
    register: Vision
  },
  {
    register: BasicAuth
  },
  {
    register: CookieAuth
  }
], function (err) {
  if (err) {
    server.log('error', 'failed to install plugins')

    throw err
  }

  server.log('info', 'Plugins registered')

  /**
   * view configuration
   */
  server.views({
    engines: {
      html: require('handlebars')
    },
    path: __dirname + '/views',
    layoutPath: 'src/views/layout',
    layout: 'default'
  })
  server.log('info', 'View configuration completed')

// validation function used for hapi-auth-basic
  var basicValidation  = function (request, username, password, callback) {
    var user = users[ username ]

    if (!user || user==0) {
      return callback(null, false)
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
      server.log('info', 'user authentication successful')
      callback(err, isValid, { id: user.id, name: user.name })
    })
  }

  server.auth.strategy('simple', 'basic', { validateFunc: basicValidation })

  server.log('info', 'Registered auth strategy: cookie auth')

  var routes = require('./rutas')
  server.route(routes)
  server.log('info', 'Routes registradas')
})

//Esto permite los archivos estaticos
server.register(require('inert'), function(err){
	if(err){
		throw err;
	}
	server.route({
	    method: 'GET',
	    path: '/src/resources/{path*}',
	    handler: {
	       directory: {
	       	path: './src/resources',
	       	listing: false,
	       	index: false
	        }
    	}
    });
     models.sequelize.sync().then(function(){
     console.log('Updated Database');
    });
});

server.start(err => {

	if(err){

		//Fancy error handling here
		console.error( 'Error was handled!' );
		console.error( err );
	}

	console.log( `Server started at ${ server.info.uri }` );
})



//EJEMPLO DE COMO USAR UN CONTROLADOR (según lo que entendí)!!!!!!!!!!!!!!!!!!!!
//          
//         server.route({
//             method: 'GET',
//             path: '/tasks/{task_id}',
//             config : {
//                 handler: taskController.findByID,
//                 validate: taskValidate.findByID
//             }
// });