console.log("main.js loaded!");

// simple function to show "hello world" message when the button is clicked
function showHello() {
    alert('Hello World!');
}

// add the click event to the button
const button = document.getElementById('hello-button');
button.addEventListener('click', showHello);

let video = document.getElementById("webcam");

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
}).then(stream => {
  video.srcObject = stream;
}).catch(error => {
  console.log("Error: " + error);
});


