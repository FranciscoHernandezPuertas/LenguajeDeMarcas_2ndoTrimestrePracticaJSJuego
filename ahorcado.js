// ### VARIABLES ###

// Array de palabras
//let palabras = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"], ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"], ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"], ["carrera", "Competición"], ["mermelada", "Confitura"]];
//opción SIN PISTA//
let palabras = ["atlantico","ordenador","laurel","plaza","rueda","cereza","petanca","higuera","everest","relampago","jirafa","luxemburgo","uruguay","ilustracion","excursion","empanadilla","pastel","colegio","carrera","mermelada"];

// Palabra a averiguar
let palabra = "";

// Nº aleatorio
let rand;

//Array donde ir guardando las letras que acierta el usuario en la posición en la que están.
//Puedes valerte de este array para ir creando con él el string que se va mostrando en los guiones a completar.
let oculta = [];

// Elemento html donde se dibujan los guiones y el usuario va intentando completar la palabra
let hueco = document.getElementById("palabra");

// Contador de intentos
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
let noEsta = document.querySelectorAll("abcdario");
let siEsta = document.querySelectorAll("abcdario");

// ### FUNCIONES ###

function registrarPalabra() {
  //OPCIONAL//
}

// Escoger palabra al azar
function generaPalabra() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)];
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
  for (var i = 0; i < 26; i++) {
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
    for (var i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        let palabraArray = hueco.textContent.split("");
        palabraArray[i] = letra;
        hueco.textContent = palabraArray.join("");
      }
    }
    let letraEsta = document.getElementById("abcdario");
    letraEsta.classList.add("siEsta:disabled");
  } else {
    cont--;
    let letraNoEsta = document.getElementById("abcdario");
    letraNoEsta.classList.add("noEsta:disabled");
  }
  oculta.push(letra);
  actualizarPantalla();
  compruebaFin();
  //esta función hace que la información Está!/No está! de cada letra desaparezca.
  setTimeout(function () {
    document.getElementById("acierto").className = "";
  }, 800);
}

// Función para obtener la segunda palabra del array bidimensional
function obtenerSegundaPalabra() {
  return palabras.map(function(elemento) {
      return elemento[1];
  });
}
//Función para mostrar la pista
function pista() {
  document.getElementById("pista").addEventListener("click", function() {
    let segundasPalabras = obtenerSegundaPalabra();
    alert(segundasPalabras.join("\n"));
  });
}

// Comprueba si ha finalizado
function compruebaFin() {
  if ( oculta.indexOf("_") == -1 ) {
    //poner Felicidades!! y asignar clases a juego ganado
    document.getElementById("msg-final").innerHTML = "Felicidades!!";
    document.getElementById("msg-final").classList.add("ganado");
    //se deshabilitan botones
    deshabilitarBotones();
    document.getElementById("reset").innerHTML = "Reiniciar";
    btnInicio.onclick = function () { location.reload() };
  } else if (cont == 0) {
    //poner Game Over y asignar clases a juego perdido
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").classList.add("msg-final");
    //crear elemento para mostrar la palabra que era y asignarle la clase encuadreR
    var palabraOcultaElement = document.createElement("div");
    palabraOcultaElement.innerHTML = "La palabra era: " + palabra;
    palabraOcultaElement.classList.add("encuadreR");
    document.body.appendChild(palabraOcultaElement);
    //se deshabilitan botones
    deshabilitarBotones();
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

// Función para deshabilitar botones después de ganar o perder
function deshabilitarBotones() {
  if ( cont == 0 ) {
    let botones = document.querySelectorAll("#abcdario button");
    botones.forEach(function (boton) {
      boton.disabled = true;
    });
  }
}


// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
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
window.onload = function() {
  inicio();
  reinicio = document.getElementById('reset');
  reinicio.addEventListener('click', inicio);
};
reinicio = document.getElementById('reset');
reinicio.addEventListener('click', inicio);
pedirPista = document.getElementById('pista');
pedirPista.addEventListener('click', pista);
nuevaPalabra = document.getElementById('alta');
nuevaPalabra.addEventListener('click', registrarPalabra);