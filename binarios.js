
//Completa con ceros iniciales el texto hasta llegar al tamaño indicado
function completarCeros(texto, tam)
{
    while(texto.length < tam)
    {
        texto = "0" + texto;
    }
    return texto;
}


//Convierte un número (pasado como number) a binario (string)
function decToBin(numero)
{
   if (numero >= 1)
   {
        let acumulador = "";
        while(numero > 1)
        {
            if (numero % 2 === 0)
            {
                acumulador = "0" + acumulador;
            }
            else
            {
                acumulador = "1" + acumulador;
                --numero;
            }

            numero /= 2;
        
        }
        acumulador = "1" + acumulador;
        return acumulador;
   }
   else
   {
        return "0";
   } 
}

//Convierte un listado de números decimales a binario
function convertirLista(listado)
{
    let acumulador = "";

    console.log("Listado: " + listado);

    for (let x = 0; x < listado.length; x++)
    {
        acumulador += completarCeros(decToBin(listado[x]), 8);
    }

    return acumulador;
}