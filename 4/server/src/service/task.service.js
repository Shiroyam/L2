import { db } from "../utils/db.js";
import { Notification } from "../utils/notification.js";
const { send } = Notification();

export const TaskService = () => {
  const create = async (req, res) => {
    try {
      const { text, doneDate, userId } = req.body;

      if (doneDate) {
        const task = await db.task.create({
          data: {
            text,
            doneAt: new Date(doneDate).toISOString(),
            complete: false,
            userId: Number(userId),
          },
        });

        return res.json(task);
      } else {
        const task = await db.task.create({
          data: {
            text,
            complete: false,
            userId: Number(userId),
          },
        });

        return res.json(task);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return res.status(500).send("Internal server error");
      }
    }
  };

  const findMany = async (req, res) => {
    try {
      const { userId, notification } = req.body;

      const tasks = await db.task.findMany({
        where: {
          userId: Number(userId),
        },
      });

      let notificationSent = true;

      if (notification)
        tasks.forEach((task) => {
          if (new Date(task.doneAt) <= new Date() && notificationSent) {
            send({
              endpoint: notification.endpoint,
              expirationTime: Number(notification.expirationTime),
              keys: {
                auth: notification.auth,
                p256dh: notification.p256dh,
              },
            })

            notificationSent= false
          }
        });

      return res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
      }
    }
  };

  const update = async (req, res) => {
    try {
      const { taskId, complete, text, doneDate } = req.body;

      if (doneDate) {
        const task = await db.task.update({
          where: {
            id: Number(taskId),
          },
          data: {
            text,
            doneAt: new Date(doneDate).toISOString(),
            complete,
          },
        });

        return res.json(task);
      } else {
        const task = await db.task.update({
          where: {
            id: Number(taskId),
          },
          data: {
            text,
            complete,
          },
        });

        return res.json(task);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
      }
    }
  };

  const remove = async (req, res) => {
    try {
      const { taskId } = req.body;

      const task = await db.task.delete({
        where: {
          id: Number(taskId),
        },
      });

      return res.json(task);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return res.status(500).send("Internal server error");
      }
    }
  };

  return {
    create,
    remove,
    update,
    findMany,
  };
};
