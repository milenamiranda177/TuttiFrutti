var lblEnviar = document.getElementById("textarea1");
var icoEnviar = document.getElementById("iconoEnviar");

function msmSend (){
    if (lblEnviar.value == "" || lblEnviar.value == null) {
        alert("No hay mensajes por enviar ");
        
    } else {
        alert("Mensaje enviado");
    }
}

icoEnviar.onclick = function(){
    msmSend();
}
