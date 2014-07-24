$( document ).ready(function() {

	jQuery.Random = function(m,n)
	{
	    m = parseInt(m);
	    n = parseInt(n);
	    return Math.floor( Math.random() * (n - m + 1) ) + m;
	}

	var codigos = ["0416","0416","0416","0426","0426","0426","0414","0414","0424","0424","0412","0412"];
	var codigo = $.Random(0,11);
	var codigo = codigos[codigo];

	var numero = $.Random(100000, 9999999);

	if (numero.length < 7) {
		var numero = concat(numero, "0");
	}
	var numero = codigo.concat(numero);

	$( "div#numero" ).html(numero);
});