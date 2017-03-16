function construir_tabla(){
	if(){  //condicion para user==vicerectorado

		var newRow = $('<th><td><p align="center">Materia/Seccion</p></td><td><p align="center">Reporte</p></td><td><p align="center">Rango</p></td></th>');
        $("#tabla-principal").append(newRow);

	}else if(){ //condicion para user==jefe de departamento

		var newRow = $('<th><td><p align="center">Materia/Seccion</p></td><td><p align="center">Evaluacion</p></td><td><p align="center">Resultados</p></td><td><p align="center">Liberar</p></td></th>');
        $("#tabla-principal").append(newRow);

	}else if(){ //condicion para user==profesor
		$('#busqueda').hide();

		var newRow = $('<th><td><p align="center">Materia/Seccion</p></td><td><p align="center">Autoevaluacion</p></td><td><p align="center">Resultados</p></td></th>');
        $("#tabla-principal").append(newRow);


	}else if(){ //condicion para user==alumno
		$('#busqueda').hide();

		var newRow = $('<th><td><p align="center">Materia/Seccion</p></td><td><p align="center">Evaluacion</p></td><td><p align="center">Estado</p></td></th>');
        $("#tabla-principal").append(newRow);
	}else{
		reply.view('/'); //<---Si el usuario no esta logeado, se envia a '/'
	}
}

function buscar(){
	var nombreCompleto = $('#nombre').val();

	nomApe = nombreCompleto.split(" ");

	Profesor.findOne({
  		where: {nombre: nomApe[0], apellido: nomApe[1]}
	}).then(function(profesor) {
  		//AQUI VA LA BUSQUEDA DE LA INFORMACION DE EVALUACIONES DEL PROFESOR Y SE MUESTRA LA INFORMACION DEPENDIENDO DEPENDIENDO
  		//SI ES UN JEFE DE DEPARTAMENTO O VICE-RECTOR
	})	
}