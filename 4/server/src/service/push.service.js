import { db } from "../utils/db.js";
import { Notification } from "../utils/notification.js";

const { send } = Notification();

export const PushService = () => {
  const create = async (req, res) => {
    try {
      const { endpoint, expirationTime, keys } = req.body;

      const notification = await db.push.findFirst({
        where: {
          auth: keys.auth,
        },
      });

      if (notification) {
        return res.json(notification);
      }

      const push = await db.push.create({
        data: {
          endpoint: endpoint,
          auth: keys.auth,
          p256dh: keys.p256dh,
          expirationTime: "60",
        },
      });

      return res.json(push);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };

  return {
    create,
  };
};
