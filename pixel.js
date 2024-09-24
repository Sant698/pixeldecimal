function decimalABinario(num) {
    var resultado = '';
    while (num > 0) {
        resultado = (num % 2) + resultado;
        num = Math.floor(num / 2);
    }
    return resultado;
}

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

function convertirABits(texto, digitos)
{
	texto = texto.split(' ');
	var acumulador = "";

	for (let t of texto)
	{
		acumulador += textoToBinario(t, digitos);
		console.log('t: ' + t + " / textoToBinario " + textoToBinario(t, digitos));
	}

	return acumulador;
}

function mostrarBits8(bitaje, dimensiones)
{
	if (bitaje.length ==  (dimensiones ** 2))
	{
		var posicion = 0;

		for (let f = 1; f <= dimensiones; f++)
		{
			for (let c = 1; c <= dimensiones; c++)
			{
				var celdaACT = document.getElementById('celdaD' + dimensiones + 'f' + f + 'c' + c);
				console.log('celdaD' + dimensiones + 'f' + f + 'c' + c + ' >>> ' + celdaACT);
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


function clicboton8(){
	var texto = window.prompt("Ingrese 8 números (separados por espacios)", "");
	var dimensiones = 8;
	mostrarBits8(convertirABits(texto, dimensiones), dimensiones);
}

function clicboton16(){
	var texto = window.prompt("Ingrese 32 números (separados por espacios)", "");
	var dimensiones = 16;
	mostrarBits8(convertirABits(texto, dimensiones), dimensiones);
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

function limpiarGrillas()
{
	var celdas = document.querySelectorAll(".celda");
	celdas.forEach((c) => c.style.backgroundColor = "white");
}

function clicbotonLimpiar()
{
	limpiarGrillas();
}

function inicializar()
{
	var contenedor8 = document.getElementById("contenedor8");
	iniciarGrilla(contenedor8, 8);

	var contenedor16 = document.getElementById("contenedor16")
	iniciarGrilla(contenedor16, 16);
}