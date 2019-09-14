

var happy = document.getElementById('happy');
var bad = document.getElementById('bad');
var dissatisfied = document.getElementById('dissatisfied');
var neutral = document.getElementById('neutral');
var txtThingking = document.getElementById('thinking');
var feeling = document.getElementById('feeling');
var file = document.getElementById('file');
var video = document.getElementById('file_multi_video');
var videoThumb = document.getElementById('video_here');
var imageThumb = document.getElementById('imgThumb');
var imgProfile = null;
var videoProfile = null;
var lastCard = 3;
var output = document.getElementById('list');
var thinkingDiv = document.getElementById("thinking");
var parentPublicaciones = document.getElementById("publicaciones");
var buttonPublicar = document.getElementById('publicar');
var videosolito = document.getElementById('videosolito');
var isVideo = null;
var counter = [];



//Events
happy.onclick= function(){
    console.log(txtThingking.value);
    addEmoticon("Se siente Felíz...");
}
bad.onclick = function(){
    addEmoticon("Se siente Decepcionado...");
}
dissatisfied.onclick = function(){
    addEmoticon("Se siente triste...");
}
neutral.onclick = function(){
    addEmoticon("Se siente neutral...");
}
file.onchange = function(){
    loadImage();
}
buttonPublicar.onclick = function(){
    publicCard();
}
video.onchange = function(){
    loadVideo();
}

//Functions

//Adiciona texto según el emoticon
function addEmoticon(texto){
    feeling.innerHTML = texto; ;
}

//Funcion para dar like
var likePub = function(liked) {
    if(counter[liked] !== undefined){
      counter[liked]=counter[liked]+1;
    }else {
      counter[liked]=1;     
    }
         document.getElementById("like"+liked).innerHTML = counter[liked];
   }


//Alista carga de imagen
function loadImage(evt) {
    isVideo = false;
    imgThumb.setAttribute('style','width:140px; height: 110px; display:block');
    videosolito.setAttribute("style","display:none")
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();

    if (file) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            console.log(reader.result);
            imageThumb.src = reader.result;
            imgProfile = reader.result;
            output.insertBefore(imageThumb,null);
        }

      }
  }

  //Alista carga de video
  function loadVideo(evt){
    isVideo = true;
    videosolito.setAttribute("style","display:block")
    imgThumb.setAttribute('style','width:140px; height: 110px; display:none');
    videoProfile = URL.createObjectURL(video.files[0])
    videoThumb.src = videoProfile; 
    console.log(videoThumb.parentElement);
    videoThumb.parentElement.load();
}

//Realiza la publicación
  function publicCard(){

    //Variables dinámicas para manejar la nueva card
    var numberCurrent = (parseInt(lastCard) + 1)
    var nameCard = "card" + numberCurrent;
    var nameTextarea = "textarea" + numberCurrent;
    var nameButton = "comment" + numberCurrent;
    var remark = "remark" + numberCurrent;
    var video = "video" + numberCurrent;
    var liked = "like" + numberCurrent;
    var thinking = feeling.innerHTML + " " + thinkingDiv.value;
    var imgThumb = document.getElementById("imgThumb");

    //Creación del elemento a insertar
    var div = document.createElement("div");

    //Encuentra el primer hijo del div de publicacones
    var theFirstChild = parentPublicaciones.firstChild;

    //Inserta el div antes del primer hijo
    parentPublicaciones.insertBefore(div, theFirstChild);

    //Plantilla del card a insertar
    var templateCard = "";

    //Si el usuario solo ha ingresado texto publica el texto y no imagenes o videos
    //Si el usuario a ingresado una imagen y lo va a publicar entra en el segundo else if
    //Si el usuario a ingresado un vide y lo va a publicar entra en el else

    if (isVideo === null){
        mediaTemplate = `<div class="card-image">` + 
        `<img src="" width=100px height=100px alt="" class="img-wall responsive-img">` + 
        `</div>` ;

        imgThumb.setAttribute("src","");
        imgThumb.setAttribute('style','width:140px; height: 110px; display:none');
        
        videosolito.setAttribute("style","display:none")
    } 
    else if(!isVideo){
        mediaTemplate = `<div class="card-image">` + 
        `<img src="${imgProfile}" width=100px height=100px alt="" class="img-wall responsive-img">` + 
        `</div>` ;
        imgThumb.setAttribute("src","");
        imgThumb.setAttribute('style','width:140px; height: 110px; display:none');
    }else{
        mediaTemplate = `<div class="card-image">` + 
        `<video width="400" height="400" controls > ` +
        `<source src="${videoProfile}" id="${video}"> Your browser does not support HTML5 video. </video> `+
        `</div>`;
        videosolito.setAttribute("style","display:none")
    }

    templateCard = `<div class="card" id=${nameCard}>` +
                    `<div class="background-opacity">` +
                    `<img src="imagenes/perfil/perfil.jpg"  width=50px height=50px alt="" class="margin-10">`+
                    `<span class="span-wall">Piña Bennet</span>` +
                    `</div>`+
                    `<div class="card-content left-align">` +
                    `<p>${thinking}</p>` + 
                    `</div>`+  
                     mediaTemplate +
                    `<div class="row">`+
                    `<div class="col s1">`+
                    `<a class=" waves-effect waves-light red btn-floating " onclick="likePub(${numberCurrent})"><i class="material-icons left ligth-text">favorite</i></a>`+
                    `</div>`+
                    `<div class="col s1">`+
                    `<p id="${liked}"></p>`+
                    `</div>`+
                    `</div>`+
                    `<div class="comment">` +
                    ` <h2 id= "userComment">  </h2>` +
                    `<textarea id=${nameTextarea}  class="estilo-textarea-perfil"></textarea>` +
                    `<button class="waves-effect waves-light btn" id=${nameButton} value="Comentar" onClick="gotoNode(${numberCurrent})" >Comentar</button>`+
                    ` <label for="" class='active'>Haz un comentario!</label>` +
                    `<div class="remark-perfil" id="${remark}"></div>` +
                    `</div>` +
                    `</div>`;



    //Inserta en el nuevo div de la publicacion la plantilla 
    div.innerHTML = templateCard;
    //Borramos textarea de publicacion
    thinking.value="";
    thinkingDiv.value = "";
    //Actualizamos última card
    lastCard = numberCurrent;
    //Limpia variable de video
    isVideo = null;
    //Limpia variable de feeling
    feeling.innerHTML = "";

  }


  function gotoNode (number){
      var textarea = document.getElementById('textarea'+number);
      var divRemark = document.getElementById('remark'+number);
      if (textarea.value !== ""){
        divRemark.innerHTML = divRemark.innerHTML + "<br>" + '<img src="imagenes/perfil/perfil.jpg" width="40px" height="40px"> ' + textarea.value;
        textarea.value = "";
      }
      

  }
