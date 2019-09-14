/**
 * Author: wmotivar
 * Date: 10/09/2018
 * Purpose: 
 *  + Funcionalidad simulación agregar stories
 *  + Funcionalidad ver mis stories agregadas
 */

$(document).ready(function () {
  $('.modal').modal();
  // $('.carousel').carousel();
});

var slider = $('.carousel');
slider.carousel();

/* Llamado de elementos del DOM */

var btnSubirHistoria = document.getElementById("subirHistoria");
var imagenSubida = document.getElementById("imgSubida");
var videoSubido = document.getElementById("videoSubido");
var myImg = document.getElementById("myImg");
var myVideo = document.getElementById("myVideo");
var videoContainer = document.getElementById("videoContainer");
var opcionTexto = document.getElementById("inputTexto");
var contenedorTexto = document.getElementById("contTextHistoria");
var btnCambiarColor = document.getElementById("cambiarColor");
var textoTemp = document.getElementById("textoTemp");
var textoSubido = document.getElementById("textoSubido");
var defaultMsg = document.getElementById("defaultStoryMsg");

/* Variables para validaciones*/
var subioImagen = false;
var subioVideo = false;
var subioTexto = false;
var error = "Debes cargar contenido";
var gradient = "linear-gradient(306deg, #76078b, #17cba6)";

// Upload imagen
$("#inputImagen").change(function () {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.files[0]);
  }
});

// Upload video
$("#inputVideo").change(function () {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = videoIsLoaded;
    reader.readAsDataURL(this.files[0]);
  }
});

function imageIsLoaded(e) {
  subioImagen = true;
  var srcImagen = e.target.result;
  // Asigno valor de imagen a elemento para vista previa
  myImg.src = srcImagen;
  myImg.setAttribute("style", "display: inline-block;");

  // Oculto lo que no está activo
  videoContainer.setAttribute("style", "display: none");
  contenedorTexto.setAttribute("class", "none");
  subioVideo = false;
  subioTexto = false;
};

function videoIsLoaded(e) {
  subioVideo = true;
  var srcVideo = e.target.result;
  // Asigno valor de video a elemento para vista previa
  myVideo.src = srcVideo;
  videoContainer.setAttribute("style", "display: inline-block;");

  // Oculto lo que no está activo    
  myImg.setAttribute("style", "display: none");
  contenedorTexto.setAttribute("class", "none");
  subioImagen = false;
  subioTexto = false;
}

function agregarTexto() {
  subioTexto = true;
  //Asigno valores propuestos por usuario a elemento para vista previa
  textoTemp.innerHTML = "";
  contenedorTexto.setAttribute("class", "show");
  contenedorTexto.style.background = gradient;

  //Oculto lo que está inactivo
  myImg.setAttribute("style", "display: none");
  videoContainer.setAttribute("style", "display: none");
  subioImagen = false;
  subioVideo = false;
}

function subirHistoria() {
  if (!subioImagen && !subioVideo && !subioTexto) {
    alert(error);
  } else {
    defaultMsg.setAttribute("class", "none");
  }
  
  if (subioImagen) {
    var imgTemp = myImg.getAttribute("src");
    if (imgTemp != "#") {
      imagenSubida.setAttribute("src", myImg.getAttribute("src"));
      videoSubido.setAttribute("src", "#");
      videoSubido.setAttribute("class", "none");
      textoSubido.innerHTML = "";
      textoSubido.setAttribute("class", "none");
      localStorage.setItem('uploadedStory', imagenSubida);
      imagenSubida.setAttribute("style", "display: inline-block;");
      myImg.setAttribute("src", "#");
    } else {
      alert(error);
    }
  }

  if (subioVideo) {
    console.log("subiovideo");
    var videoTemp = myVideo.getAttribute("src");
    if (imgTemp != "#") {
      videoSubido.setAttribute("src", myVideo.getAttribute("src") + "#t=15,20");
      imagenSubida.setAttribute("src", "#");
      textoSubido.innerHTML = "";
      localStorage.setItem('uploadedStory', videoSubido);
      videoSubido.setAttribute("class", "show");
      myVideo.setAttribute("src", "#");
      myVideo.setAttribute("style", "display: inline-block");
      textoSubido.setAttribute("class", "none");
    } else {
      alert(error);
    }
  }

  if (subioTexto) {
    textoSubido.innerHTML = textoTemp.value;
    textoSubido.style.background = gradient;
    textoSubido.setAttribute("class", "show");
    imagenSubida.setAttribute("src", "#");
    videoSubido.setAttribute("src", "#");
    imagenSubida.setAttribute("class", "none");
    videoSubido.setAttribute("class", "none");
    textoTemp.innerHTML = "";
  }

  console.log("antes append");
  var a = document.createElement('a');

  if (subioImagen) {
    var linkContent = document.createElement("img");
    linkContent.src = imagenSubida.src;
  }

  if (subioVideo) {
    var linkContent = document.createElement("video");
    linkContent.src = videoSubido.src;
    linkContent.setAttribute("controls", "controls");
  }

  if (subioTexto) {
    var linkContent = document.createElement("div");
    linkContent.innerHTML = textoSubido.innerHTML;
    linkContent.setAttribute("style", textoSubido.style.cssText);
  }

  linkContent.style.border = "3px solid #999999";
  a.appendChild(linkContent);
  a.href = "#five!";
  a.setAttribute("class", "carousel-item");
  misHistorias.appendChild(a);

  //remove the 'initialized' class which prevents slider from initializing itself again when it's not needed
  if (slider.hasClass('initialized')) {
    slider.removeClass('initialized')
  }
  //just reinit the carousel
  slider.carousel();
}

btnSubirHistoria.onclick = function () {
  subirHistoria();
}

opcionTexto.onclick = function () {
  agregarTexto();
}

btnCambiarColor.onclick = function () {
  generate();
}

// Utilidad color
function generate() {

  var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

  function populate(a) {
    for (var i = 0; i < 6; i++) {
      var x = Math.round(Math.random() * 14);
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

  var newColor1 = populate('#');
  var newColor2 = populate('#');
  var angle = Math.round(Math.random() * 360);

  gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

  contenedorTexto.style.background = gradient;
}

document.onload = generate();