
// functión que es capaz de reutilizarse para distintos cambios en el html
function textInert(texto,elemento){
    let elementoHTML = document.querySelector(elemento)
    elementoHTML.innerHTML = texto;
    return; // Como buena práctica
}

// Variables
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let maximoDeIntentos = 5
// Función para genear un número aleatorio

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    if(listaNumerosSorteados.length == numeroMaximo){
    textInert(`Llegaste al final del juego, acertaste todos los números aleatorios.`, 'p')

    } else{
        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Función que contiene la configuración inicial del juego.
function condicionesIniciales() {
    textInert('Juego del número secreto', 'h1')
    textInert(`Digite un número del 1 al ${numeroMaximo}, tienes un máximo de ${maximoDeIntentos}
    ${maximoDeIntentos == 1 ? 'intento' : 'intentos'}`, 'p')
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

condicionesIniciales();
// Función para verificar si el usuario acertó el número secreto
// obteniendo el valor del input donde el usuario ingresa su
// número, extraemos ese valor para realizar la verificación.
// Buscamos el valor mediante el id del input y su value, por si tenemos más de un input
// Evaluamos los diferentes casos dando pistas al usario sobre cual podría ser el número en base a si es mayor o menor
// Y en caso de alcanzar el número máximo de intentos terminar le ejecución ahí para volver a iniciar todo.
function verificarNumero(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if(numeroDeUsuario === numeroSecreto){
        textInert(`¡Acertaste el número secreto en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}, el número es ${numeroDeUsuario}!`, 'p')
        document.getElementById('reiniciar').removeAttribute('disabled')    
    } else if(numeroDeUsuario >  numeroSecreto){
        textInert(`El número secreto es menor que ${numeroDeUsuario}`,'p')
        limpiarCampo();
    } else {
        textInert(`El número secreto es mayor que ${numeroDeUsuario}`,'p')
        limpiarCampo();
    }
    intentos++;

    if(intentos > maximoDeIntentos){
        textInert("Perdiste, usaste todos tus intentos",'p')
        document.getElementById('reiniciar').removeAttribute('disabled')    
        return;
    }
}

function limpiarCampo(){
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego(){
    // Limpiar campo
    limpiarCampo();
    // Indicar el mensaje de intervalo de números
    // Generar el numero aleatorio
    // Inicializar el número de intentos
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true')
}
