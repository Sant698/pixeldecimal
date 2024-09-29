let resolucion="";

function  completarCeros(texto, cantidad) {
	var acumulador = texto;

	var diferencia = cantidad - texto.length;
	if (diferencia > 0 )
	{
		while(diferencia > 0)
		{
			acumulador = '0' + acumulador;
			diferencia -= 1;
		}
	}

	return acumulador;
}

function decimalToBin(numero, digitos)
{
	var acumulador = '';
	while(numero > 1)
	{
		if (numero % 2 == 0)
		{
			acumulador = '0' + acumulador;
			
		}
		else
		{
			acumulador = '1' + acumulador;
			numero -= 1;
		}

		numero /= 2;
	}

	if (numero > 0)
		acumulador = '1' + acumulador;

	acumulador = completarCeros(acumulador, digitos);



	return acumulador;
}

//Convierte un número decimal ingresado como texto a binario
function textoToBinario(decimalSTR, digitos)
{
	decimal = parseInt(decimalSTR, 10);

	if (!isNaN(decimal)) //Not (NaN) = Not (Not a Number) = a Number = es un número
	{
		binario = decimalToBin(decimal, digitos);
		return binario;		
	}
	else
	{
		return "";
	}
}

//Separa los números decimales y los convierte en binarios
function separarConvertir(texto)
{
	texto = texto.split(' ');
	var acumulador = "";

	for (let t of texto)
	{
		acumulador += textoToBinario(t, 8);
	}

	return acumulador;
}

function mostrarBits(bitaje, dimensiones)
{
	if (bitaje.length ==  (dimensiones ** 2))
	{
		var posicion = 0;

		for (let f = 1; f <= dimensiones; f++)
		{
			for (let c = 1; c <= dimensiones; c++)
			{
				var celdaACT = document.getElementById('celdaD' + dimensiones + 'f' + f + 'c' + c);
				//console.log('celdaD' + dimensiones + 'f' + f + 'c' + c + ' >>> ' + celdaACT);
				if (bitaje[posicion] == '1')
				{
					//celdaACT.setAttribute('background-color', 'orange');
					celdaACT.style.backgroundColor = "orange";
				}
				else
				{
					//celdaACT.setAttribute('background-color', 'grey');
					celdaACT.style.backgroundColor = "grey";
				}
				++posicion;
			}
		}
	}
	else
	{
		console.log('Errata!!!');
		console.log('Bitaje:' + bitaje + '.');
		window.alert('Error! Deben ser ingresados exactamente ' + ((dimensiones ** 2) / 8) + ' números decimales.');
	}
}

function iniciarGrilla(contenedor, dimension)
{
	for (let f = 1; f <= dimension; f++)
	{
		var filaN = document.createElement("div");
		filaN.setAttribute('class', 'fila');
		filaN.setAttribute('id', 'd' + dimension + 'fila' + f);
		contenedor.appendChild(filaN);

		for (let c = 1; c <= dimension; c++)
		{
			var celdaN = document.createElement("div");
			celdaN.setAttribute('class', 'celda');
			celdaN.setAttribute('id', 'celdaD' + dimension + 'f' + f + 'c' + c);

			filaN.appendChild(celdaN);

		}
	}
}


//listadoC: Listado de contenedores
//cantidad: cantidad de opciones
function inicializarOpciones(nombre, listadoC, cantidad){

	var contenedorActual = 0;

	//ciclo de creación de opciones
	for (let c = 0; c < cantidad; c++)
	{
		//Actualiza el contenedor actual
		if (c > 0 && c % 8 == 0)
		{
			++contenedorActual;
			if (contenedorActual > listadoC.length)
			{
				contenedorActual = 0;
			}
		}

		var selector = document.createElement("select");
		selector.setAttribute("id", nombre + "-" + String(c));

		//ciclo de creación de números de la opción
		for (let s = 0; s <= 255; s++)
		{
			var opcion = document.createElement("option");
			opcion.value = String(s);
			opcion.textContent = String(s);
			selector.appendChild(opcion);
		}


		listadoC[contenedorActual].appendChild(selector);
	}
}

//Determina que secciones se muestran según el modo en que se está trabajando ///////
function cambiarModo(modo)
{
	if (modo == "menu")
	{
		console.log("Modo menú activado");
		var menu = document.getElementById("menu");
		menu.style.display = "flex";

		var resultado = document.getElementById("resultado");
		resultado.style.display = "none";

	}

	if (modo == "grilla")
	{
		console.log("Modo grilla activado");
		var menu = document.getElementById("menu");
		menu.style.display = "none";

		var resultado = document.getElementById("resultado");
		resultado.style.display = "flex";

		if (resolucion == "8x8")
		{
			console.log("Mostrar 8x8");
			var grilla8 = document.getElementById("grilla8");
			console.log("grilla8: ", grilla8);
			grilla8.style.display = "flex";

			var grilla16 = document.getElementById("grilla16");
			console.log("grilla16: ", grilla16);
			grilla16.style.display = "none";
		}

		if (resolucion == "16x16")
		{
			console.log("Mostrar 16x16");
			var grilla8 = document.getElementById("grilla8");
			grilla8.style.display = "none";

			var grilla16 = document.getElementById("grilla16");
			grilla16.style.display = "flex";
		}		
	}
}

function dibujarPixeles()
{
	if (resolucion == "8x8")
	{
		var acumulador = "";

		for (let x = 0; x < 8; x++)
		{
			var numero = document.getElementById("numero8-" + String(x));
			acumulador += numero.value + " ";

		}

		mostrarBits(separarConvertir(acumulador), 8);
	}

	if (resolucion == "16x16")
	{
		var acumulador = "";

		for (let x = 0; x < 32; x++) //Son 16 líneas compuestas por 8 + 8 bits cada una
		{
			var numero = document.getElementById("numero16-" + String(x));
			acumulador += numero.value + " ";
			console.log("acumulador16= <" + acumulador + "> longitud=" + String(acumulador.length));
		}

		mostrarBits(separarConvertir(acumulador), 16);		
	}
}

//Disparadores de botones ////////////////////////////////////////////////////////
function clicBotonNuevo()
{
	cambiarModo("menu");
}

function clicSelector8()
{ 
	console.log("disparado selector 8");
	var numeros = document.getElementById("numeros8");
	numeros.style.display = "flex";

	numeros = document.getElementById("numeros16");
	numeros.style.display = "none";

	var selector8 = document.getElementById("selector8");
	selector8.className = "selectorAct";

	var selector16 = document.getElementById("selector16");
	selector16.className = "selectorDes";

	resolucion = "8x8";
}

function clicSelector16()
{ 
	console.log("disparado selector 16");
	var numeros = document.getElementById("numeros8");
	numeros.style.display = "none";

	numeros = document.getElementById("numeros16");
	numeros.style.display = "flex";

	var selector8 = document.getElementById("selector8");
	selector8.className = "selectorDes";

	var selector16 = document.getElementById("selector16");
	selector16.className = "selectorAct";

	resolucion = "16x16";
}

function clicDibujar()
{
	cambiarModo("grilla");
	dibujarPixeles();
}

//Al cargarse la ventana //////////////////////////////////////////////////////////
function inicializar()
{
	//Preparado de las grillas
	var contenedor8 = document.getElementById("contenedor8");
	iniciarGrilla(contenedor8, 8);

	var contenedor16 = document.getElementById("contenedor16")
	iniciarGrilla(contenedor16, 16);

	
	//Preparado de las listas para ingreso de números
	var listado8C = [];
	listado8C.push(document.getElementById("numeros8-A"));
	inicializarOpciones("numero8", listado8C, 8);

	var listado16C = [];
	listado16C.push(document.getElementById("numeros16-A"));	
	listado16C.push(document.getElementById("numeros16-B"));
	listado16C.push(document.getElementById("numeros16-C"));
	listado16C.push(document.getElementById("numeros16-D"));
	inicializarOpciones("numero16", listado16C, 32);

	//Preparadon opción por defecto
	clicSelector8();

	//Preparar las grillas (TODO borrable)
	cambiarModo("menu"); 	
}