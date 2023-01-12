console.log("main.js loaded!");

// simple function to show "hello world" message when the button is clicked
function showHello() {
    alert('Hello World!');
}

// add the click event to the button
const button = document.getElementById('hello-button');
button.addEventListener('click', showHello);

// let video = document.getElementById("webcam");

const video = document.getElementById('webcam');

// Create a canvas element and a 2D rendering context
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Set the canvas dimensions to match the video dimensions
canvas.width = video.width;
canvas.height = video.height;

// Append the canvas to the DOM
document.body.appendChild(canvas);

// Create a new object tracker and pass the 'face' classifier
var objects = new tracking.ObjectTracker(['face']);

// Listen for the 'track' event and handle it
objects.on('track', function(event) {
  if (event.data.length === 0) {
    console.log("No heads were detected in this frame.");
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      console.log("Head detected at x: " + rect.x + ", y: " + rect.y + ", width: " + rect.width + ", height: " + rect.height);
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  }
});

// Start tracking heads in the video element with id 'myVideo'
tracking.track('#webcam', objects);
