// check if the browser support service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then((reg) => {
            console.log('Service worker registered.', reg);
        })
        .catch((err) => {
            console.log('Service worker registration failed:', err);
        });
    });
}


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

