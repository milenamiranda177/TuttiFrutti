var friend1 = document.getElementById("friendPapa");
var friend2 = document.getElementById("friendPera");
var muroPlaya = document.getElementById("diaPlaya");
var muroEvento = document.getElementById("evento");
var muroDulce = document.getElementById("piñaDulce");

function friendPapa(){
    alert("El señor Papa es ahora tu amigo");
}
function friendPera(){
    alert("La señora Pera es ahora tu amiga");
}
function diaPlaya(){
    alert("Haz indicado que te gusta Día en la playa!")
}
function evento(){
    alert("Haz indicado que te gusta Evento")
}
function piñaDulce(){
    alert("Haz indicado que te gusta Piña Dulce!!")
}

friend1.onclick = function(){
    friendPapa();
}
friend2.onclick = function(){
    friendPera();
}
muroPlaya.onclick = function(){
    diaPlaya();
}
muroEvento.onclick = function(){
    evento();
}
muroDulce.onclick = function(){
    piñaDulce();
}