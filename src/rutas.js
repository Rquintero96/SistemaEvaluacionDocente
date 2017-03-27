var Boom = require('boom')
var Bcrypt = require('bcrypt')
var models = require('./models')
var Sequelize= require('sequelize');
var sequelize = models.sequelize;
var routes = [

//VISTAS NORMALES

     {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      var data = {
        message: 'Check the route that requires auth at /basic'
      }

      reply.view('index', data)
    }
  },
{
    method: 'GET',
    path: '/registro-estudiantil',
    handler: function (request, reply) {
        reply.view('registro-estudiantil');
    }
},
{
    method: 'GET',
    path: '/registro-docente',
    handler: function (request, reply) {
        reply.view('registro-docente');
    }
},
{
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {
                reply.view('login');
            }
        
    
},
{
    method: 'GET',
    path: '/evaluacion',
    handler: function (request, reply) {
        reply.view('evaluacion');
    }
},
{
    method: 'GET',
    path: '/home',
    handler: function (request, reply) {
        reply.view('home');
    }
},
{
    method: 'GET',
    path: '/evaluacion-A',
    handler: function (request, reply) {
        reply.view('evaluacionA');
    }
},
{
    method: 'GET',
    path: '/evaluacion-B',
    handler: function (request, reply) {
        reply.view('evaluacionB');
    }
},
{
    method: 'GET',
    path: '/dashboard',
    handler: function (request, reply) {
        reply.view('principalGeneral');
    }
},
//FIN VISTAS NORMALES

//prueba de BDD
// {
//     method: 'GET',
//     path: '/perfil',
//     config: {
//       auth: 'simple',
//       handler: function (request, reply) {
//         reply.view('perfil')
//       }
//     }
//   },
   {
     method: 'GET',
     path: '/logout',
     handler: function (request, reply) {
         reply.view('index').code(401);
     }
   },
  {
    method:'GET',
    path:'/db',
    handler: function(request, reply){
        models.sequelize.query("SELECT * FROM usuario", { type: sequelize.QueryTypes.SELECT})
  .then(function(users) {
      reply(users);
    // We don't need spread here, since only the results will be returned for select queries
  })
    }
},
//METODO PARA REGISTRO
{
    method: 'POST',
    path: '/registro-estudiantil',
    config: {
        handler: function (request, reply) {
            var correo = request.payload.email;
            var ced = request.payload.ci;
	        var pass = request.payload.contra;
            Bcrypt.genSalt(10, function(err, salt) {
        if(err) {
                return console.error(err);
        }

        Bcrypt.hash(pass, salt, function(err, hash) {
                if(err) {
                        return console.error(err);
                }

            console.log(correo+" "+ced+" "+hash);
            
            var user1={};
            user1.correo = correo;
            
            sequelize.query("INSERT INTO estudiantes (CI,correo,tipo,contrasena) VALUES (:cedula,:email,0,:contrasena);",{ replacements: { cedula: ced, email: correo, contrasena: hash }, type: sequelize.QueryTypes.INSERT}).then(function(res) {
                // Results will be an empty array and metadata will contain the number of affected rows.
                reply.view('perfil', user1);
            });
        });
                
            });
                
            }
    }
},
//METODO PARA LOGIN
{
 method: 'POST',
  path: '/login',
  config: {
    handler: function (request, reply) {
      var username = request.payload.email;
      var password = request.payload.contra;
      models.sequelize.query("SELECT * FROM estudiantes where correo = :key",{ replacements: { key: username }, type: sequelize.QueryTypes.SELECT}).then(function (estudiante){
          console.log(estudiante);
          console.log(estudiante[0].contrasena);
          if(!estudiante){
          console.log("sin exito.");
          reply.view('login');
      }
      else{
          
        Bcrypt.compare(password, estudiante[0].contrasena, function(err, isValid) {
            if(err){
                console.log("too bad");
                console.log(err);
            }
            if(isValid){
                var user1={};
                user1.correo = username;
              reply.view('perfil', user1);
            }else{
                reply.view('login');
            }
        })

          
          

     }
      });
      
      
    }
  }
},

{
 method: 'POST',
  path: '/login-profesor',
  config: {
    handler: function (request, reply) {
      var username = request.payload.usuario
      var password = request.payload.contra
      var profesor= models.sequelize.query("SELECT * FROM profesor where correo=\'"+username+"\'", { type: sequelize.QueryTypes.SELECT})
      
      if(!profesor){
          alert('No existe un profesor con ese correo')
          reply.view('/login-profesor')
      }
      else{
          if(profesor.contrasena == password){
              request.cookieAuth.set(profesor);
              reply.view('/dashboard')
          }
          else{
              alert('La contraseña no es correcta')
              reply.view('/login-profesor')
          }
      }
    }
  }
},
{
 method: 'POST',
  path: '/login-jefeDepartamento',
  config: {
    handler: function (request, reply) {
      var username = request.payload.usuario
      var password = request.payload.contra
      var jefeDepartamento= models.sequelize.query("SELECT * FROM jefeDepartamento where correo=\'"+username+"\'", { type: sequelize.QueryTypes.SELECT})
      
      if(!jefeDepartamento){
          alert('No existe un usuario con ese correo')
          reply.view('/login-jefeDepartamento')
      }
      else{
          if(jefeDepartamento.contrasena == password){
              request.cookieAuth.set(jefeDepartamento);
              reply.view('/dashboard')
          }
          else{
              alert('La contraseña no es correcta')
              reply.view('/login-jefeDepartamento')
          }
      }
    }
  }
},
{
 method: 'POST',
  path: '/login-viceRectorado',
  config: {
    handler: function (request, reply) {
      var username = request.payload.usuario
      var password = request.payload.contra
      var viceRectorado= models.sequelize.query("SELECT * FROM viceRectorado where correo=\'"+username+"\'", { type: sequelize.QueryTypes.SELECT})
      
      if(!viceRectorado){
          alert('No existe un usuario con ese correo')
          reply.view('/login-viceRectorado')
      }
      else{
          if(viceRectorado.contrasena == password){
              request.cookieAuth.set(viceRectorado);
              reply.view('/dashboard')
          }
          else{
              alert('La contraseña no es correcta')
              reply.view('/login-viceRectorado')
          }
      }
    }
  }
}

]

module.exports = routes