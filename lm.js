$( document ).ready(function() {

	var busqueda_numero = $.Numero();
	var numero = busqueda_numero.numero;
	var id = busqueda_numero.id;

	var no_enviada = $("body").find("span.errormandatory").text();
	var input_numero_telefono = $("span.qnumcode:contains('00')").parent().parent().children('.survey-question-answer').find('input');
	if ( typeof no_enviada !== "undefined" && no_enviada) {
		var numero = $(input_numero_telefono).val();
		console.log(numero);
		var consulta = $.Consulta(numero);
		var id = consulta.id;
	}


	$( "div#numero" ).html(numero);
	$( "div#numero" ).attr('data-id', id);

	$(input_numero_telefono).val(numero);
	$(input_numero_telefono).attr('readonly', 'true');
	$(input_numero_telefono).addClass("input-disabled");


	/*var pregunta_encuesta_efectiva = $("span.qnumcode:contains('1')").parent().parent().children('.survey-question-answer').find('input');
	var pregunta_razon_no_efectiva = $("span.qnumcode:contains('2')").parent().parent().children('.survey-question-answer').find('input');
	var pregunta_sexo = $("span.qnumcode:contains('3')").parent().parent().children('.survey-question-answer').find('input');
	var pregunta_edad = $("span.qnumcode:contains('4')").parent().parent().children('.survey-question-answer').find('select');
	var pregunta_estado = $("span.qnumcode:contains('5')").parent().parent().children('.survey-question-answer').find('select');
	var pregunta_zona = $("span.qnumcode:contains('6')").parent().parent().children('.survey-question-answer').find('select');

	$(pregunta_encuesta_efectiva).change(function(event) {
		$.EnviarNumero();
	});
	$(pregunta_razon_no_efectiva).change(function(event) {
		$.EnviarNumero();
	});
	$(pregunta_sexo).change(function(event) {
		$.EnviarNumero();
	});
	$(pregunta_edad).change(function(event) {
		$.EnviarNumero();
	});
	$(pregunta_estado).change(function(event) {
		$.EnviarNumero();
	});
	$(pregunta_zona).change(function(event) {
		$.EnviarNumero();
	});*/

	$("form").submit(function(event) {
		$.EnviarNumero();
	});
});



jQuery.EnviarNumero = function(){
	var sexo_array = [
		"F",
		"M"
	];

	var edad_array = [
		"18-24 años",
		"25-34 años",
		"35-49 años",
		"50 o mas años",
		"No sabe / No responde (No leer)"
	];
	var estado_array = [
		"Amazonas",
		"Anzoátegui",
		"Apure",
		"Aragua",
		"Barinas",
		"Bolívar",
		"Carabobo",
		"Cojedes",
		"Delta Amacuro",
		"Distrito Capital",
		"Falcón",
		"Guárico",
		"Lara",
		"Mérida",
		"Miranda",
		"Monagas",
		"Nueva Esparta",
		"Portuguesa",
		"Sucre",
		"Táchira",
		"Trujillo",
		"Vargas",
		"Yaracuy",
		"Zulia",
		"No sabe / No responde (No leer)",
	];

	var zona_array = [
		"Casco Central",
		"Urbanización privada",
		"Urbanización hecha por el Estado",
		"Barrio consolidado",
		"Barrio",
		"Pueblo y/o Caserio",
		"No sabe / No responde (No leer)"
	];

	var razon_no_efectiva_array = [
		"No le interesa",
		"No contestó el teléfono",
		"Contestadora automatica",
		"Colgo el teléfono",
		"El número telefónico no existe",
		"Número suspendido",
		"Menor de edad"
	];


	var input_encuesta_efectiva = $("span.qnumcode:contains('1')").parent().parent().children('.survey-question-answer').find('input:checked').val();
	var input_razon_no_efectiva = $("span.qnumcode:contains('2')").parent().parent().children('.survey-question-answer').find('input:checked').next("label").text();
	var razon_no_efectiva = jQuery.inArray( input_razon_no_efectiva, razon_no_efectiva_array );
	var numero = $( "div#numero" ).text();
	var fecha = $.now();
	var id = $("div#numero").attr('data-id');


	if ( typeof input_encuesta_efectiva !== "undefined") {
		if ((input_encuesta_efectiva == 'N' || input_encuesta_efectiva == 'C') && (typeof razon_no_efectiva !== "undefined" && razon_no_efectiva >= 0)) {
			var row = {};
			row["numero"] = numero;
			row["razon_no_efectiva"] = razon_no_efectiva;
			row["fecha"] = fecha;
			//row['prueba'] = true;
			if (id == 0) {
				var id = $.Insertar(row);
				$( "div#numero" ).attr('data-id', id);
			}
			else {
				$.Actualizar(row, id);
			}
		}
		else {
			var input_sexo = $("span.qnumcode:contains('3')").parent().parent().children('.survey-question-answer').find('input:checked').val();
			var input_edad = $("span.qnumcode:contains('4')").parent().parent().children('.survey-question-answer').find('option:selected').text();
			var input_estado = $("span.qnumcode:contains('5')").parent().parent().children('.survey-question-answer').find('option:selected').text();
			var input_zona = $("span.qnumcode:contains('6')").parent().parent().children('.survey-question-answer').find('option:selected').text();

			var sexo = jQuery.inArray( input_sexo, sexo_array );
			var edad = jQuery.inArray( input_edad, edad_array );
			var estado = jQuery.inArray( input_estado, estado_array );
			var zona = jQuery.inArray( input_zona, zona_array );
			if (( typeof sexo !== "undefined" && sexo >= 0) && ( typeof edad !== "undefined" && edad >= 0) && ( typeof estado !== "undefined" && estado >= 0) && ( typeof zona !== "undefined" && zona >= 0)) {
				var row = {};
				row["numero"] = numero;
				row["sexo"] = sexo;
				row["edad"] = edad;
				row["estado"] = estado;
				row["zona"] = zona;
				row["fecha"] = fecha;
				//row['prueba'] = true;
				if (id == 0) {
					var id = $.Insertar(row);
					$( "div#numero" ).attr('data-id', id);
				}
				else {
					$.Actualizar(row, id);
				}
			}
		}
	}
}


jQuery.Parametros = function(nombre_parametro) {
	switch (nombre_parametro){
		case 'urlbase':
			var parametro ="https://api.mongolab.com/api/1/";
			break;
		case 'collection':
			var parametro = "numero";
			break;
		case 'apikey':
			var parametro = "iV1XrqloI35v1kOAs9Q24R11nrEFqavf";
			break;
	}
	return parametro;
}

jQuery.Random = function(m,n) {
	m = parseInt(m);
	n = parseInt(n);
	return Math.floor( Math.random() * (n - m + 1) ) + m;
}

jQuery.Numero = function() {
	var codigos = ["0416","0416","0416","0426","0426","0426","0414","0414","0424","0424","0412","0412"];
	var codigo = $.Random(0,11);
	var codigo = codigos[codigo];

	var numero = $.Random(100000, 9999999);
	if (numero < 1000000) {
		var numero = "0".concat(numero);
	}
	var numero = codigo.concat(numero);

	//Buscar si el numero existe en la base de datos, si existe verificar que se uso hace mas de un año
	var consulta = $.Consulta(numero);
	var id = consulta.id;
	var fecha = consulta.fecha;

	if (id != 0) {
		var fecha_actual = $.now();
		if ( (fecha_actual - fecha) < (365 * 24 * 3600 * 1000)) {
			var numero = $.Numero();
		}
	}
	return {"numero": numero, "id": id};
}


jQuery.Consulta = function(numero) {
	var urlbase = $.Parametros('urlbase');
	var apikey = $.Parametros('apikey');
	var collection = $.Parametros('collection');

	$.ajax({
		url: urlbase + 'databases/numeros/collections/' + collection + '?q={"numero":"'+ numero + '"}&apiKey=' + apikey,
		dataType: 'json',
		async: false,
		success: function(data) {
		  resultado = data;
		}
	});
	for (var key in resultado) {
		if (resultado.hasOwnProperty(key)) {
			// here you have access to
			id = resultado[key]._id["$oid"];
			fecha = resultado[key].fecha;
		}
	}
	if ( typeof id !== "undefined" && id) {
		return {"id": id, "fecha": fecha};
	}
	else {
		return {"id": 0, "fecha": 0};
	}
}


jQuery.Insertar = function(row) {
	var urlbase = $.Parametros('urlbase');
	var apikey = $.Parametros('apikey');
	var collection = $.Parametros('collection');
	var id;
	$.ajax({
	    url: urlbase + 'databases/numeros/collections/' + collection + '?apiKey=' + apikey,
			data: JSON.stringify( row ),
			type: "POST",
			async: false,
			contentType: "application/json",
			success: function(data) {
				id = data._id.$oid;
			}
	});
	return id;
}

jQuery.Actualizar = function(row, id) {
	var urlbase = $.Parametros('urlbase');
	var apikey = $.Parametros('apikey');
	var collection = $.Parametros('collection');
	$.ajax({
	    url: urlbase + 'databases/numeros/collections/' + collection + '/' + id + '?apiKey=' + apikey,
			data: JSON.stringify( row ),
			type: "PUT",
			async: false,
			contentType: "application/json",
	});
}