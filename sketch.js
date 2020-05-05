var database;
var isDrawing = false;
var drawing = [];
var currentPath = [];
var clearButton;
var saveButton;

function setup() {
  database = firebase.database();

  var canvas = createCanvas(550, 550);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

   clearButton = select('#clearButton');
   clearButton.mousePressed(clearDrawing);
   
   saveButton = select('#saveButton');
   saveButton.mousePressed(saveDrawing);

    var ref = database.ref('drawings');
    ref.on('value' , gotData , errData);

}

function draw() {
  background("black");

   if(isDrawing){
       var point = {
         x: mouseX,
         y: mouseY
       }
       currentPath.push(point);
   }
   stroke(255);
   strokeWeight(10);
   noFill();
   
   for(var i=0 ; i<drawing.length ; i++){
     var path = drawing[i];
     beginShape();
    for(var j=0 ; j<path.length ; j++){
      vertex(path[j].x , path[j].y);
   }
   endShape();
  }
   

}

function startPath(){
  currentPath = [];
  isDrawing = true;
  drawing.push(currentPath);
}

function clearDrawing(){
      drawing = [];
}

function endPath() {
  isDrawing = false;
}

function saveDrawing(){
  var ref = database.ref('drawings');
  var data = {
    name: "Aarav",
    drawing: drawing

  }
 var result= ref.push(data , dataSent);
 //console.log(result);
}

function dataSent(err,status){
  console.log(status);
}

function errData(err){
  console.log(err);
}

function  gotData(data){
   var drawings = data.val()
   var keys = Object.keys(drawings);
   for (var i = 0; i<keys.length; i++){
     var key = keys[i];
     console.log(key);
   }
   }
