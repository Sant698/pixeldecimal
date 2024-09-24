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

function inicializar() {
	var contenedor = document.getElementById("grilla");
	console.log("contenedor:", contenedor);

	for (let x = 1; x < 256; x++)
	{
		var nuevo = document.createElement("div");
		nuevo.setAttribute('class', 'cuadrado');
		contenedor.appendChild(nuevo);
	}

	
}