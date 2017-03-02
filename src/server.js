var Hapi = require('hapi')
var Vision = require('vision')
var server = new Hapi.Server()

server.connection({
	port: 8000
});


// register vision to your server instance
server.register(Vision, function (err) {  
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