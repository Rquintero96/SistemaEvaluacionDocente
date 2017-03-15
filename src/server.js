var Hapi = require('hapi')
var Vision = require('vision')
var controllers = require('./controllers')
var models = require('./models')

//Inicializa el modulo de autentificacion
var BasicAuth = require('hapi-auth-basic')
    //y esta es la herramienta para las validaciones a usar
    var Bcrypt = require('bcrypt')

//Modulo para almacenar informacion a traves de la pagina
var CookieAuth = require('hapi-auth-cookie')  

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
	port: 8000
});


// register vision to your server instance
server.register(Vision, function (err) {  
    //Si ocurre algun error
  if (err) {
    console.log('Cannot register vision')
  }

  // configure template support   
  server.views({
    engines: {
      html: require('handlebars')
    },
    path: __dirname + '/views',
    layoutPath: 'src/views/layout',
    layout: 'default'
  })
})

// Modulo para la verificacion de usuario
server.register(BasicAuth, function (err) {

     if (err) {
        throw err
        console.log('Menor hubo un error en el modulo de validacion')
    }

    // validation function used for hapi-auth-basic
  var basicValidation  = function (request, username, password, callback) {
    var user = users[ username ]

    if (!user) {
      return callback(null, false)
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
      callback(err, isValid, { id: user.id, name: user.name })
    })
  }

  //Estrategia a usar para la validacion
  server.auth.strategy('simple', 'basic', { validateFunc: basicValidation })

  //Ruta protegida
  server.route({
    method: 'GET',
    path: '/prueba',
    config: {
    auth: 'simple',
    handler: function (request, reply) {
      reply('Si menor este mensaje solo lo pueden ver los usuarios autentificados plo plo');
    }
  }
});
})


/*Modulo donde se definen las rutas de la aplicacion y permite ir de vista en vista. 
Al agregar un view hay que agergar una nueva ruta en esta sesion*/
server.route({

	method: 'GET',
	path: '/',
	handler: function(request, reply){
		var data = {
			title: 'Home',
			message: 'Este es el home'
		};
		return reply.view('index',data);
	}
});

server.route({
    method: 'GET',
    path: '/registro-estudiantil',
    handler: function (request, reply) {
        reply.view('registro-estudiantil');
    }
});

server.route({
    method: 'GET',
    path: '/registro-docente',
    handler: function (request, reply) {
        reply.view('registro-docente');
    }
});


server.route({
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {
        reply.view('login');
    }
});

server.route({
    method: 'GET',
    path: '/evaluacion',
    handler: function (request, reply) {
        reply.view('evaluacion');
    }
});

server.route({
    method: 'GET',
    path: '/home',
    handler: function (request, reply) {
        reply.view('home');
    }
});

server.route({
    method: 'GET',
    path: '/evaluacion-A',
    handler: function (request, reply) {
        reply.view('evaluacionA');
    }
});

server.route({
    method: 'GET',
    path: '/evaluacion-B',
    handler: function (request, reply) {
        reply.view('evaluacionB');
    }
});

server.route({
    method: 'GET',
    path: '/dashboard',
    handler: function (request, reply) {
        reply.view('principalGeneral');
    }
});

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