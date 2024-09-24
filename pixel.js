function decimalABinario(num) {
    var resultado = '';
    while (num > 0) {
        resultado = (num % 2) + resultado;
        num = Math.floor(num / 2);
    }
    return resultado;
}

function decToBin(decimalSTR)
{
	decimal = parseInt(decimalSTR, 10);
	binario = decimalABinario(decimal);
	return binario;

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

function inicializar()
{
	var contenedor8 = document.getElementById("contenedor8");
	iniciarGrilla(contenedor8, 8);

	var contenedor16 = document.getElementById("contenedor16")
	iniciarGrilla(contenedor16, 16);
}

function clicboton8(){
	var texto = window.prompt("Ingrese 8 números (separados por espacios)", "");

}

function clicboton16(){
	var texto = window.prompt("Ingrese 32 números (separados por espacios)", "");

}