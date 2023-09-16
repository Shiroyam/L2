self.addEventListener("push", function (event) {
  const title = "Напоминание о задаче";
  const options = {
    body: "Ваша задача истекает!",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
