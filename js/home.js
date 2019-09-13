var textArBusqueda = document.getElementById("thinking");
var icoPublic = document.getElementById("publicar");

function msmPublic (){
    if (textArBusqueda.value == "" || textArBusqueda.value == null) {
        alert("No hay publicaciones a realizar")
    } else {
        alert("Publicación Realizada");
    }
}

icoPublic.onclick = function(){ 
    msmPublic();
}

