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

  // validation function used for hapi-auth-cookie: optional and checks if the user is still existing
  /*var validation = function (request, session, callback) {
    var username = session.username
    var user = Users[ username ]

    if (!user) {
      return callback(null, false)
    }

    server.log('info', 'user authenticated')
    callback(err, true, user)
  }

  server.auth.strategy('session', 'cookie', true, {
    password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
    cookie: 'future-studio-hapi-tutorials-cookie-auth-example',
    redirectTo: '/',
    isSecure: false,
    validateFunc: validation
  })*/

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