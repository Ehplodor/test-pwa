self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("Hello, World!");
    })
  );
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log(
          "Service worker registered: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service worker registration failed: ", error);
      });
  });
}
