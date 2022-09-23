status = "";
input_text = "";


function preload() {

}

function setup() {
    canvas  = createCanvas(325, 325);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(325, 325);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input_id").value;

}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 325, 325);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].heigth);

            if(objects[i].lablel == input_text){
                video.stop();
                objectDetector.detect(gotResults); 
                document.getElementById("objects").innerHTML = input_text + " Found";
                var utterThis = new SpeechSynthesisisUtterance(input_text + "Found");
                var synth = window.speechSynthesis;
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objects").innerHTML = input_text + " Not Found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}