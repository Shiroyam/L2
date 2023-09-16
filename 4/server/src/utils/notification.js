import webpush from "web-push"

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

export const Notification = () => {
  const send = async (pushSubscription) => {
    const notificationPayload = {
      notification: {
        title: 'Напоминание о задаче',
        body: 'Задача "Название задачи" истекает!',
      },
    };

    return webpush
      .sendNotification(pushSubscription, JSON.stringify(notificationPayload))
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    send,
  };
};
