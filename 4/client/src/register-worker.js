import { baseUrl } from "./api";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker зарегистрирован с областью видимости: ', registration.scope);
    })
    .catch(function(err) {
      console.error('Ошибка регистрации Service Worker: ', err);
    });
  });

  navigator.serviceWorker.ready.then(async function (registration) {
    const pushServerPublicKey =
      "BEUlk85h_eDEphqiR1YP9w6TpsrDnp-vHT5RNklg6qsa84SL7qpx4o_VL878JQePsQwdtncllD_IyMbLlO1NtSY";

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushServerPublicKey,
    });


     fetch(baseUrl + "/subscription", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}
