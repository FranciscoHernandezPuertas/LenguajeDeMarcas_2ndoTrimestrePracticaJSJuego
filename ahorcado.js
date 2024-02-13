// ### VARIABLES ###

// Array de palabras
let palabras = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"], ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"], ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"], ["carrera", "Competición"], ["mermelada", "Confitura"]];
//opción SIN PISTA//
//let palabras = ["atlantico","ordenador","laurel","plaza","rueda","cereza","petanca","higuera","everest","relampago","jirafa","luxemburgo","uruguay","ilustracion","excursion","empanadilla","pastel","colegio","carrera","mermelada"];

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

// ### FUNCIONES ###

function registrarPalabra(){
  //OPCIONAL//
}

// Escoger palabra al azar
function generaPalabra() {

}

// Función para dibujar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Función para crear los botones de las letras
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  let i = a.charCodeAt(0), j = z.charCodeAt(0);
  let letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='Ñ'>Ñ</button>";
    }
  }
}

//Función para comprobar la letra de cada intento
function intento(letra) {
  //acuérdate de deshabilitar la letra que acaba de ser pulsada



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

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
  document.getElementById("hueco-pista").innerHTML = "";
}

// Iniciar
window.onload = inicio();
reinicio = document.getElementById('reset');
reinicio.addEventListener('click', inicio);
pedirPista = document.getElementById('pista');
pedirPista.addEventListener('click', pista);
nuevaPalabra = document.getElementById('alta');
nuevaPalabra.addEventListener('click', registrarPalabra);