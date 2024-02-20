// Lista de palabras para el juego
let palabras = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"], ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"], ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"], ["carrera", "Competición"], ["mermelada", "Confitura"]];

// Palabra a adivinar
let palabra = "";

// Nº aleatorio
let rand;

// Letras utilizadas
let oculta = [];

// Elemento HTML donde se muestra la palabra a adivinar
let hueco = document.getElementById("palabra");

// Número de intentos
let cont = 6;

// Botones de letras
let buttons = document.getElementsByClassName('letra');

// Boton de reset
let btnInicio = document.getElementById("reset");

let reinicio;
let pedirPista;
let nuevaPalabra;

// Elemento HTML donde se muestra el número de intentos restantes
let intentosRestantes = document.getElementById("intentos");

// Elemento HTML donde se muestra la imagen del ahorcado
let imagenAhorcado = document.getElementById("imagen");

// Elemento HTML donde se muestra el mensaje final
let msgFinal = document.getElementById("msg-final");

// Contenedor del abecedario
let abecedarioContainer = document.getElementById("abcdario");

//Elementos del código css para modificar las letras que estén o no
var noEsta = document.querySelectorAll("abcdario");
var siEsta = document.querySelectorAll("abcdario");

// ### FUNCIONES ###

function registrarPalabra(){
  //OPCIONAL//
}

// Escoger palabra al azar
function generaPalabra() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)][0];
    hueco.textContent = "_".repeat(palabra.length);
}

// Función para dibujar los guiones de la palabra
function pintarGuiones(num) {
    for (var i = 0; i < num; i++) {
        oculta[i] = "_";
    }
    hueco.innerHTML = oculta.join("");
}

//Función para crear los botones de las letras
function generaABC() {
    for (let i = 0; i < 26; i++) {
        let letra = String.fromCharCode(65 + i);
        let boton = document.createElement("button");
        boton.textContent = letra;
        boton.addEventListener("click", function () {
            if (!oculta.includes(letra.toLowerCase())) {
                intento(letra.toLowerCase());
            }
        });
        abecedarioContainer.appendChild(boton);
    }
}

// Función para actualizar la pantalla con la palabra mostrada y los intentos restantes
function actualizarPantalla() {
    intentosRestantes.textContent = cont;
    imagenAhorcado.src = "img/ahorcado_" + cont + ".png";
}

//Función para comprobar la letra de cada intento
function intento(letra) {
    if (palabra.includes(letra)) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                let palabraArray = hueco.textContent.split("");
                palabraArray[i] = letra;
                hueco.textContent = palabraArray.join("");
            }
        }
        noEsta.disabled = true;
        siEsta.disabled = false; // Cambiar color del botón a verde
    } else {
        cont--;
        noEsta.disabled = false;
        siEsta.disabled = true; // Cambiar color del botón a rojo
    }
    oculta.push(letra);
    actualizarPantalla();
    compruebaFin();
    //esta función hace que la información Está!/No está! de cada letra desaparezca.
    setTimeout(function () {
        document.getElementById("acierto").className = "";
    }, 800);
}

//Función para mostrar la pista
function pista() {
  //OPCIONAL//
}

// Comprueba si ha finalizado
function compruebaFin() {
    if( oculta.indexOf("_") == -1 ) {
      //poner Felicidades!! y asignar clases a juego ganado
      
      //se deshabilitan botones
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      document.getElementById("reset").innerHTML = "Empezar";
      btnInicio.onclick = function() { location.reload() };
    }else if( cont == 0 ) {
      //poner Game Over y asignar clases a juego perdido
  
      //crear elemento para mostrar la palabra que era y asignarle la clase encuadreR
  
      //se deshabilitan botones
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
      document.getElementById("reset").innerHTML = "Empezar";
      btnInicio.onclick = function () { location.reload() };
    }
}

// Función para deshabilitar botones después de ganar o perder
function deshabilitarBotones() {
    let botones = document.querySelectorAll("#abcdario button");
    botones.forEach(function (boton) {
        boton.disabled = true;
    });
}


// Restablecer juego
function inicio() {
    generaPalabra();
    pintarGuiones(palabra.length);
    cont = 6;
    document.getElementById("intentos").innerHTML=cont;
    document.getElementById("hueco-pista").innerHTML = "";
    oculta = [];
    msgFinal.textContent = "";
    actualizarPantalla(); 
    // Restablecer los botnes
    let botones = document.querySelectorAll("#abcdario button");
    botones.forEach(function (boton) {
        boton.disabled = false;
        boton.style.backgroundColor = "";
    });
}

// Inicialización del juego
generaPalabra();
generaABC();
actualizarPantalla();

// Iniciar
window.onload = inicio();
reinicio = document.getElementById('reset');
reinicio.addEventListener('click', inicio);
pedirPista = document.getElementById('pista');
pedirPista.addEventListener('click', pista);
nuevaPalabra = document.getElementById('alta');
nuevaPalabra.addEventListener('click', registrarPalabra);