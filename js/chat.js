know = {
    "hola" : "holi",
    "como estas?" : "bien, bien y tu?",
    "bien" : ":)"
};

function talk() {
    console.log("entro");
    var user = document.getElementById("userBox").value;
    document.getElementById("userBox").value = "";
    document.getElementById("chatLog").innerHTML += "<div class='card-panel grey lighten-5'>"+user+"</div>";
    if (user in know) {
        document.getElementById("chatLog").innerHTML += "<div class='card-panel green lighten-3'> "+ know[user]+"</div>";
    } else {
        document.getElementById("chatLog").innerHTML += "<div class='card-panel green lighten-3'> no te entiendo...</div>";
    }
} 
