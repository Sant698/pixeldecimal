var dimensionACT = "8x8"; //Dimensión actual
//modo = {"ingresos" | "dibujo"}
var modo8 = "ingresos"; //Determina la pantalla que se está mostrando cuando se trabaja con la resolución 8x8
var modo16 = "ingresos"; //Determina la pantalla que se está mostrando cuando se trabaja con la resolución 16x16
var g16Creada = false; //Determina si ya se crearon las celdas de la grilla16
var modificacion8 = false; //Determina si algún valor se modificó (para saber si hay que redibujar la grilla 8x8)
var modificacion16 = false; //Determina si algún valor se modificó (para saber si hay que redibujar la grilla 16x16)

//Clic en el botón que redimensiona a un dibujo 8x8
function clickDim8(dim8, dim16)
{
    if (dimensionACT != "8x8") //Si no es la dimensión actual
    {
        dimensionACT = "8x8";
        dim8.setAttribute("class", "bDimensionSEL");
        dim16.setAttribute("class", "bDimension");

        let ingreso8 = document.getElementById("ingreso8");
        let dibujo8 = document.getElementById("dibujo8");
        if (modo8 === "ingresos")
        {
            ingreso8.setAttribute("class", "ingresos");
            dibujo8.setAttribute("class", "dibujoOCULT");
        }
        else //(modo8 === "dibujo")
        {
            ingreso8.setAttribute("class", "ingresosOCULT");
            dibujo8.setAttribute("class", "dibujo");
        }

        //Oculta los elementos relativos al trabajo en dimensión 16x16
        let ingreso16 = document.getElementById("ingreso16");
        let dibujo16 = document.getElementById("dibujo16");
        ingreso16.setAttribute("class", "ingresosOCULT");
        dibujo16.setAttribute("class", "dibujoOCULT");
    }
}

//Clic en el botón que redimensiona a un dibujo 16x16
function clickDim16(b8, b16)
{
    if (dimensionACT != "16x16") //Si no es la dimensión actual
    {
        dimensionACT = "16x16";
        dim8.setAttribute("class", "bDimension");
        dim16.setAttribute("class", "bDimensionSEL");

        let ingreso16 = document.getElementById("ingreso16");
        let dibujo16 = document.getElementById("dibujo16");
        if (modo16 === "ingresos")
        {
            ingreso16.setAttribute("class", "ingresos");
            dibujo16.setAttribute("class", "dibujoOCULT");
        }
        else //(modo16 === "dibujo")
        {
            ingreso16.setAttribute("class", "ingresosOCULT");
            dibujo16.setAttribute("class", "dibujo");
        }

        //Oculta los elementos relativos al trabajo en dimensión 16x16
        let ingreso8 = document.getElementById("ingreso8");
        let dibujo8 = document.getElementById("dibujo8");
        ingreso8.setAttribute("class", "ingresosOCULT");
        dibujo8.setAttribute("class", "dibujoOCULT");
    }
}

//Cuando se hace clic en uno de los números que contienen los valores
function clickNum8(numero)
{
    let ingreso = parseInt(window.prompt("Ingrese un número (entre 0 a 255):"), 10);
    if (ingreso != NaN)
    {
        if (ingreso >= 0 && ingreso <= 255)
        {
            let numeroE = document.getElementById(numero);
            numeroE.innerText = String(ingreso);
            modificacion8 = true;
        }
        else
        {
            window.alert("El valor ingresado está fuera del rango permitido!!!");
        }
    }
    else
    {
        window.alert("El valor ingresado no es un número!!!");
    }
}

//Cuando se hace clic en uno de los números que contienen los valores
function clickNum16(numero)
{
    let ingreso = parseInt(window.prompt("Ingrese un número (entre 0 a 255):"), 10);
    if (ingreso != NaN)
    {
        if (ingreso >= 0 && ingreso <= 255)
        {
            let numeroE = document.getElementById(numero);
            numeroE.innerText = String(ingreso);
            modificacion16 = true;
        }
        else
        {
            window.alert("El valor ingresado está fuera del rango permitido!!!");
        }
    }
    else
    {
        window.alert("El valor ingresado no es un número!!!");
    }
}

//Separa los números del texto en una lista y aquellos que sean números no válidos los reemplaza por 0
function filtrarNums(texto, cantidad)
{
    let total = 0;
    let acumulador = [];
    let separado = texto.split(" ");
    
    for (let x = 0; x < separado.length; x++)
    {
        let numero = parseInt(separado[x], 10);
        if ((numero != NaN) && ((numero >= 0) && (numero <= 255)))
        {
            acumulador.push(separado[x]);
        }
        else
        {
            acumulador.push("0");
        }
    }

    if (acumulador.length < cantidad)
    {
        window.alert("Precaución, se ingresó una menor cantidad de valores que los solicitados!!");
    }

    while(acumulador.length < cantidad)
    {
        acumulador.push("0");
    }

    return acumulador;
}

//Carga los números ingresados para la grilla 8x8 por el usuario desde una cadena de texto
function cargarTexto8(texto)
{
    let listado = filtrarNums(texto, 8);

    for (let x = 1; x <=8; x++)
    {
        let n8 = document.getElementById("n8-" + x);
        n8.innerText = listado[x-1];
    }

    modificacion8 = true;
}

function clicLin8()
{
    let texto = window.prompt("Ingrese 8 números (entre 0 a 255) separados por un espacio:", "");
    
    if (texto != null && texto != "")
    {
        cargarTexto8(texto);
    }
}

function clickLinea(letra)
{
    let texto = window.prompt("Ingrese 8 números (entre 0 a 255) separados por un espacio:", "");
    
    if (texto != null && texto != "")
    {
        let listado = filtrarNums(texto, 8);

        let inicio = 0;
        switch(letra)
        {
            case "A":
                inicio = 1;
                break;
            case "B":
                inicio = 9;
                break;
            case "C":
                inicio = 17;
                break;
            case "D":
                inicio = 25;
                break;
            default:
                inicio = 1;
                break;
        }
    
        let contador = 0;
        for (let x = inicio; x <= inicio + 7; x++)
        {
            let n16 = document.getElementById("n16-" + x);
            n16.innerText = listado[contador++];
        }

        modificacion16 = true;
    }

}


//Devuelve un listado de los valores decimales ingresados por el usuario (en forma de listado)
function listarValores(dimensiones)
{
    let valores = [];
    let nombre = "";
    let total = 0;

    if (dimensiones === "8x8")
    {   
        nombre = "n8-";
        total = 8;
    }
    else
    {
        nombre = "n16-";
        total = 32;
    }
    
    for (let x = 1; x <= total; x++)
    {
        let nIngresado = document.getElementById(nombre + String(x));
        let numero = parseInt(nIngresado.innerText, 10);
        if (numero != NaN)
        {
            valores.push(numero);
        }
    }

    return valores;
}

function pintar(bitaje, dimension)
{   
    let nombre = "";
    if (dimension === "8x8")
    {
        nombre = "g8-";
    }
    else
    {
        nombre = "g16-";
    }

    for (let x = 0; x < bitaje.length; x++)
    {
        let celda = document.getElementById(nombre + String(x+1));
        console.log("Celda: " + nombre + String(x+1) + ", Valor: " + celda);
        if (bitaje[x] === "1")
        {
            celda.style.backgroundColor = "orange";
        }
        else
        {
            celda.style.backgroundColor = "grey";
        }
    }
}

function bDibujar8()
{
    modo8 = "dibujo";

    let dibujo8 = document.getElementById("dibujo8");
    dibujo8.setAttribute("class", "dibujo");

    let ingreso8 = document.getElementById("ingreso8");
    ingreso8.setAttribute("class", "ingresosOCULT");

    if (modificacion8)
    {
        let valores = listarValores("8x8");
        let bitaje = convertirLista(valores);
        pintar(bitaje, "8x8");
        modificacion8 = false;
        console.log("Se realizó dibujo nuevo 8x8");
    }
}

function bDibujar16()
{
    modo16 = "dibujo";

    if (!g16Creada) //Garantiza que la grilla se cree una única vez
    {
        g16Creada = true;
        crearGrilla16();
    }    

    let dibujo16 = document.getElementById("dibujo16");
    dibujo16.setAttribute("class", "dibujo");

    let ingreso16 = document.getElementById("ingreso16");
    ingreso16.setAttribute("class", "ingresosOCULT");
    
    if (modificacion16)
    {
        let valores = listarValores("16x16");
        let bitaje = convertirLista(valores);
        pintar(bitaje, "16x16");
        modificacion16 = false;
        console.log("Se realizó dibujo nuevo 16x16");
    }
}

function bVolver8()
{
    let ingreso8 = document.getElementById("ingreso8");
    let dibujo8 = document.getElementById("dibujo8");
    
    ingreso8.setAttribute("class", "ingresos");
    dibujo8.setAttribute("class", "dibujoOCULT");
    
    modo8 = "ingresos";
}

function bVolver16()
{
    let ingreso16 = document.getElementById("ingreso16");
    let dibujo16 = document.getElementById("dibujo16");
    
    ingreso16.setAttribute("class", "ingresos");
    dibujo16.setAttribute("class", "dibujoOCULT");
    
    modo16 = "ingresos";
}

function crearGrilla16()
{
    let grilla16 = document.getElementById("grilla16");

    let acumulador = 1;
    for (let fila = 1; fila <=16; fila++)
    {
        let fNueva = document.createElement("div");
        fNueva.setAttribute('class', 'fila');
        //fNueva.setAttribute('id', "fila16-" + String(fila));
        grilla16.appendChild(fNueva);

        for (let columna = 1; columna <=16; columna++)
        {
            let cNueva = document.createElement("div");
            cNueva.setAttribute('id', "g16-" + String(acumulador));
            fNueva.appendChild(cNueva);
            ++acumulador;
        }
    }
}

//Devuelve una cadena de los valores decimales ingresados por el usuario (separado cada uno por un espacio)
function obtenerDecimales(dimension)
{
    let valores = "";
    let nombre = "";
    let total = 0;

    if (dimension === "8x8")
    {   
        nombre = "n8-";
        total = 8;
    }
    else
    {
        nombre = "n16-";
        total = 32;
    }
    
    for (let x = 1; x <= total; x++)
    {
        let nIngresado = document.getElementById(nombre + String(x)).innerText;
        valores += nIngresado;
        if (x < total)
        {
            valores += " ";
        }
    }

    return valores;
}

function bGuardar8()
{
    let nombre = window.prompt("Ingrese el nombre del dibujo que desea GUARDAR:", "");
    if (nombre != "")
    {
        localStorage.setItem("8x8-" + nombre, obtenerDecimales("8x8"));
    }
}

function bCargar8()
{
    let nombre = window.prompt("Ingrese el nombre del dibujo que desea CARGAR:", "");
    if (nombre != "")
    {
        let cargado = localStorage.getItem("8x8-" + nombre);

        if (cargado != null)
        {
            cargarTexto8(cargado);
        }
        else
        {
            window.alert("No se guardó ningún dibujo con el nombre <" + nombre + ">!!!");
        }
    }
}

function bGuardar16()
{
    let nombre = window.prompt("Ingrese el nombre del dibujo:", "");
    if (nombre != "")
    {
        localStorage.setItem("16x16-" + nombre, obtenerDecimales("16x16"));
    }
}

//Carga los números ingresados para la grilla 16x16 por el usuario desde una cadena de texto
function cargarTexto16(texto)
{
    let listado = filtrarNums(texto, 8);

    for (let x = 1; x <=32; x++)
    {
        let n16 = document.getElementById("n16-" + String(x));
        n16.innerText = listado[x-1];
    }

    modificacion16 = true;
}

function bCargar16()
{
    let nombre = window.prompt("Ingrese el nombre del dibujo que desea CARGAR:", "");
    if (nombre != "")
    {
        let cargado = localStorage.getItem("16x16-" + nombre);

        if (cargado != null)
        {
            cargarTexto16(cargado); //TODO
        }
        else
        {
            window.alert("No se guardó ningún dibujo con el nombre <" + nombre + ">!!!");
        }
    }
}

function inicializar()
{   
    let dim8 = document.getElementById("dim8");
    let dim16 = document.getElementById("dim16");

    dim8.addEventListener("click", function() {
            clickDim8(dim8, dim16);
    });
        
    dim16.addEventListener("click", function() {
        clickDim16(dim8, dim16);
    });

    for(let x = 1; x <= 8; x++)
    {
        let nx = document.getElementById("n8-" + x);
        nx.addEventListener("click", function(){
            clickNum8("n8-" + x);
        })
    }

    for(let x = 1; x <=32;x++)
    {
        let nx = document.getElementById("n16-" + x);
        nx.addEventListener("click", function(){
            clickNum16("n16-" + x);
        });
    }

    document.getElementById("linea8").addEventListener("click", clicLin8);

    document.getElementById("lineaA").addEventListener("click", function(){
        clickLinea("A");
    });

    document.getElementById("lineaB").addEventListener("click", function(){
        clickLinea("B");
    });

    document.getElementById("lineaC").addEventListener("click", function(){
        clickLinea("C");
    });

    document.getElementById("lineaD").addEventListener("click", function(){
        clickLinea("D");
    });

    document.getElementById("dibujar8").addEventListener("click", bDibujar8);
    document.getElementById("dibujar16").addEventListener("click", bDibujar16);

    document.getElementById("volver8").addEventListener("click", bVolver8);
    document.getElementById("volver16").addEventListener("click", bVolver16);

    document.getElementById("guardar8").addEventListener("click", bGuardar8);
    document.getElementById("cargar8").addEventListener("click", bCargar8);

    document.getElementById("guardar16").addEventListener("click", bGuardar16);
    document.getElementById("cargar16").addEventListener("click", bCargar16);
}