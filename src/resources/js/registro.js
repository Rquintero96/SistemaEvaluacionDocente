var models = require('./models');
var sequelize = models.sequelize;

function registro(){
    var correo = $('#email').val();
    var ced = $('#ci').val();
	var pass = $('#contraseña').val();
	
	console.log("hola");
	
	sequelize.query("INSERT INTO estudiantes (CI,correo,tipo,contrasena) VALUES (:cedula,:email,0,:contrasena);",{ replacements: { cedula: ced, email: correo, contrasena: pass }, type: sequelize.QueryTypes.INSERT}).spread(function(results, metadata) {
  // Results will be an empty array and metadata will contain the number of affected rows.
        alert("Usuario Registrado!");
    });
    alert("Se corrio!");
}