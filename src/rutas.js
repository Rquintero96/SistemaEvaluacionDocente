var Boom = require('boom')
var Bcrypt = require('bcrypt')
var models = require('./models')
var Sequelize=require('sequelize');
var sequelize = models.sequelize;
var routes = [
{
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		var data = {
			title: 'Home',
			message: 'Este es el home'
		};
		return reply.view('index',data);
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
{
    method:'GET',
    path:'/db',
    handler: function(request, reply){
        models.sequelize.query("SELECT * FROM user", { type: sequelize.QueryTypes.SELECT})
  .then(function(users) {
      reply(users);
    // We don't need spread here, since only the results will be returned for select queries
  })
    }
}
]

module.exports = routes