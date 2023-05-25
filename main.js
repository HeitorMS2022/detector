var stats = "";
var img = "";
var objetooos = [];
var audio = "";
function preload(){
    song = loadSound("iphone_2024_tm.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
}
function draw(){
    image(video, 0, 0, 600, 500);
    if (stats != ""){
        object_detector.detect(video, gotResults);
    }
    for(i = 0; i < objetooos.length; i++){
        document.getElementById("status").innerHTML = "Status: objetos detectados";
        porcentagem = floor(objetooos[i].confidence * 100);
        fill("00FFFF");
        text(objetooos[i].label + " " + porcentagem + "%", objetooos[i].x + 15, objetooos[i].y + 15);
        if(objetooos[i].label == document.getElementById("oi").value){
            document.getElementById("alarme").innerHTML = "Bebê encontrado"; console.log("stop"); song.stop();
        }
        else{
            document.getElementById("alarme").innerHTML = "Objeto não encontrado"; console.log("play"); song.play();
        }
        if(objects.length == 0){
            document.getElementById("alarme").innerHTML = "Objeto não encontrado"; console.log("play"); song.play();
        }
    }
}
function iniciar(){
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
}
function modelLoaded(){
    console.log("Uhu! O modelo carregou!")
    stats = "true";
    document.getElementById("status").innerHTML = "Status: detectando objeto";
}
function gotResults(error, results){
    if(error){
        console.log("errooouuu!");
    }
    else{
        console.log(results);
        objetooos = results;
    }
}