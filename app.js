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
const canvas = document.createElement('canvas');


navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
}).then(stream => {
  video.srcObject = stream;
}).catch(error => {
  console.log("Error: " + error);
});

const tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);

tracking.track('#webcam', tracker, { camera: true });

tracker.on('track', function(event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
  });
});
