console.log("main.js loaded!");

// simple function to show "hello world" message when the button is clicked
function showHello() {
    alert('Hello World!');
}

// add the click event to the button
const button = document.getElementById('hello-button');
button.addEventListener('click', showHello);

let video = document.getElementById("webcam");

//navigator.permissions.query({name:'camera'}).then(function(permissionStatus) {
//    console.log(permissionStatus.state); // "granted" or "denied"
//});

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
}).then(stream => {
  video.srcObject = stream;
}).catch(error => {
  console.log("Error: " + error);
});


var canvas = document.createElement('canvas');
canvas.width = 64;
canvas.height = 64;

var ctx = canvas.getContext('2d');

function displayScaledFrame() {
    ctx.drawImage(video, 0, 0, 64, 64);
    var scaledVideo = document.getElementById("scaled-video");
    scaledVideo.src = canvas.toDataURL();
  }
  
  setInterval(displayScaledFrame, 30);

