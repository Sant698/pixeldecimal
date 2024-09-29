var resolucion="";

function  completarCeros(texto, cantidad) {
	let acumulador = texto;

	let diferencia = cantidad - texto.length;
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
	let acumulador = '';
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
	let acumulador = "";

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
		let posicion = 0;

		for (let f = 1; f <= dimensiones; f++)
		{
			for (let c = 1; c <= dimensiones; c++)
			{
				let celdaACT = document.getElementById('celdaD' + dimensiones + 'f' + f + 'c' + c);
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
		let filaN = document.createElement("div");
		filaN.setAttribute('class', 'fila');
		filaN.setAttribute('id', 'd' + dimension + 'fila' + f);
		contenedor.appendChild(filaN);

		for (let c = 1; c <= dimension; c++)
		{
			let celdaN = document.createElement("div");
			celdaN.setAttribute('class', 'celda');
			celdaN.setAttribute('id', 'celdaD' + dimension + 'f' + f + 'c' + c);

			filaN.appendChild(celdaN);

		}
	}
}


//listadoC: Listado de contenedores
//cantidad: cantidad de opciones
function inicializarOpciones(nombre, listadoC, cantidad){

	let contenedorActual = 0;

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

		let selector = document.createElement("select");
		selector.setAttribute("id", nombre + "-" + String(c));

		//ciclo de creación de números de la opción
		for (let s = 0; s <= 255; s++)
		{
			let opcion = document.createElement("option");
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
		let menu = document.getElementById("menu");
		menu.style.display = "flex";

		let resultado = document.getElementById("resultado");
		resultado.style.display = "none";

	}

	if (modo == "grilla")
	{
		console.log("Modo grilla activado");
		let menu = document.getElementById("menu");
		menu.style.display = "none";

		let resultado = document.getElementById("resultado");
		resultado.style.display = "flex";

		if (resolucion == "8x8")
		{
			console.log("Mostrar 8x8");
			let grilla8 = document.getElementById("grilla8");
			console.log("grilla8: ", grilla8);
			grilla8.style.display = "flex";

			let grilla16 = document.getElementById("grilla16");
			console.log("grilla16: ", grilla16);
			grilla16.style.display = "none";
		}

		if (resolucion == "16x16")
		{
			console.log("Mostrar 16x16");
			let grilla8 = document.getElementById("grilla8");
			grilla8.style.display = "none";

			let grilla16 = document.getElementById("grilla16");
			grilla16.style.display = "flex";
		}		
	}
}

function dibujarPixeles()
{
	if (resolucion == "8x8")
	{
		let acumulador = "";

		for (let x = 0; x < 8; x++)
		{
			let numero = document.getElementById("numero8-" + String(x));
			acumulador += numero.value + " ";

		}

		mostrarBits(separarConvertir(acumulador), 8);
	}

	if (resolucion == "16x16")
	{
		let acumulador = "";

		for (let x = 0; x < 32; x++) //Son 16 líneas compuestas por 8 + 8 bits cada una
		{
			let numero = document.getElementById("numero16-" + String(x));
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
	let numeros = document.getElementById("numeros8");
	numeros.style.display = "flex";

	numeros = document.getElementById("numeros16");
	numeros.style.display = "none";

	let selector8 = document.getElementById("selector8");
	selector8.className = "selectorAct";

	let selector16 = document.getElementById("selector16");
	selector16.className = "selectorDes";

	resolucion = "8x8";
}

function clicSelector16()
{ 
	console.log("disparado selector 16");
	let numeros = document.getElementById("numeros8");
	numeros.style.display = "none";

	numeros = document.getElementById("numeros16");
	numeros.style.display = "flex";

	let selector8 = document.getElementById("selector8");
	selector8.className = "selectorDes";

	let selector16 = document.getElementById("selector16");
	selector16.className = "selectorAct";

	resolucion = "16x16";
}

function clicDibujar()
{
	cambiarModo("grilla");
	dibujarPixeles();
}

function ingresarValoresTx(texto, nombreVal, cantidadVal)
{
	
	let listado = texto.split(' ');
	let posicionVal = 0; //Posición de valor actual que está siendo ingresado
	let banderaError = false;


	for(let l = 0; l < listado.length; l++)
	{
		decimal = parseInt(listado[l], 10);

		if (!isNaN(decimal))
		{
			let valor = document.getElementById(nombreVal + "-" + String(posicionVal));
			if (valor != null)
			{
				if (decimal >= 0 && decimal <= 255)
				{
					valor.value = decimal;
					++posicionVal;
				}
				else
				{
					banderaError = true;
				}
				
			}
			else
			{
				valor.style.className = "error";
			}
			
		}

		if (posicionVal > cantidadVal)
		{
			window.alert("Ingresó una mayor cantidad de valores de los requeridos!!!");
			break;
		}
	}


	if (banderaError)
	{
		window.alert("Se hallaron valores no numéricos y fueron omitidos!!!");
	}
}

function clicIngresarT()
{
	if (resolucion == "8x8")
	{
		let texto = window.prompt("Ingrese 8 números decimales (del 0 al 255)", "");
		ingresarValoresTx(texto, "numero8", 8);
	}

	if (resolucion == "16x16")
	{
		let texto = window.prompt("Ingrese 32 números decimales (del 0 al 255)", "");
		ingresarValoresTx(texto, "numero16", 32);
	}
}

//Al cargarse la ventana //////////////////////////////////////////////////////////
function inicializar()
{
	//Preparado de las grillas
	let contenedor8 = document.getElementById("contenedor8");
	iniciarGrilla(contenedor8, 8);

	let contenedor16 = document.getElementById("contenedor16")
	iniciarGrilla(contenedor16, 16);

	
	//Preparado de las listas para ingreso de números
	let listado8C = [];
	listado8C.push(document.getElementById("numeros8-A"));
	inicializarOpciones("numero8", listado8C, 8);

	let listado16C = [];
	listado16C.push(document.getElementById("numeros16-A"));	
	listado16C.push(document.getElementById("numeros16-B"));
	listado16C.push(document.getElementById("numeros16-C"));
	listado16C.push(document.getElementById("numeros16-D"));
	inicializarOpciones("numero16", listado16C, 32);

	//Preparadon opción por defecto
	clicSelector8();

	//Preparar las grillas
	cambiarModo("menu"); 	
}