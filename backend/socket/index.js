const socketIo = require("socket.io");
const { sequelize } = require("../models");
const Message = require("../models").Message;

//list of active socket connections
const users = new Map();
const userSockets = new Map();

const SocketServer = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      let sockets = [];

      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        const allSockets = [...existingUser.sockets, socket.id];
        existingUser.sockets = [...allSockets];
        users.set(user.id, existingUser);
        sockets = [...allSockets];
        userSockets.set(socket.id, user.id);
      } else {
        sockets = [socket.id];
        users.set(user.id, {
          id: user.id,
          sockets,
        });
        userSockets.set(socket.id, user.id);
      }

      const onlineFriends = []; //ids
      const chatters = await getChatters(user.id); //get by query

      //notify friends (who have an active socket connection (online)) of the user that the user is online
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i]);
          chatter.sockets.forEach((socket) => {
            try {
              io.to(socket).emit("online", user);
            } catch (error) {}

            onlineFriends.push(chatter.id);
          });
        }
      }

      //send to user sockets which friends are online
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("friends", onlineFriends);
        } catch (error) {}
      });
    });

    socket.on("disconnect", async () => {
      if (userSockets.has(socket.id)) {
        const user = users.get(userSockets.get(socket.id));

        if (user.sockets.length > 1) {
          user.sockets = user.sockets.filter((sock) => {
            if (sock !== socket.id) {
              return true;
            } else {
              userSockets.delete(sock);
              return false;
            }
          });

          users.set(user.id, user);
        } else {
          const chatters = await getChatters(user.id);

          //notify friends (who have an active socket connection (online)) of the user that the user is offline
          for (let i = 0; i < chatters.length; i++) {
            if (users.has(chatters[i])) {
              const chatter = users.get(chatters[i]);
              chatter.sockets.forEach((socket) => {
                try {
                  io.to(socket).emit("offline", user);
                } catch (error) {}
              });
            }
          }

          userSockets.delete(socket.id);
          users.delete(user.id);
        }
      }
    });

    socket.on("message", async (message) => {
      let sockets = [];

      if (users.has(message.fromUser.id)) {
        sockets = users.get(message.fromUser.id).sockets;
      }

      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          sockets = [...sockets, ...users.get(id).sockets];
        }
      });

      try {
        const msg = {
          type: message.type,
          fromUserId: message.fromUser.id,
          chatId: message.chatId,
          message: message.message,
        };

        const savedMessage = await Message.create(msg);

        message.User = message.fromUser;
        message.fromUserId = message.fromUser.id;
        message.id = savedMessage.id;
        message.message = savedMessage.message;
        delete message.fromUser;

        sockets.forEach((socket) => {
          io.to(socket).emit("received", message);
        });
      } catch (error) {}
    });

    socket.on("typing", (message) => {
      message.toUserId.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            io.to(socket).emit("typing", message);
          });
        }
      });
    });

    socket.on("add-friend", (chats) => {
      try {
        let status = "offline";

        if (users.has(chats[1].Users[0].id)) {
          status = "online";
          chats[0].Users[0].status = "online";
          users.get(chats[1].Users[0].id).sockets.forEach((socket) => {
            io.to(socket).emit("new-chat", chats[0]);
          });
        }

        if (users.has(chats[0].Users[0].id)) {
          chats[1].Users[0].status = status;
          users.get(chats[0].Users[0].id).sockets.forEach((socket) => {
            io.to(socket).emit("new-chat", chats[1]);
          });
        }
      } catch (error) {}
    });

    socket.on("add-user-to-group", ({ chat, newChatter }) => {
      if (users.has(newChatter.id)) {
        newChatter.status = "online";
      }

      //notify old users
      chat.Users.forEach((user, index) => {
        if (users.has(user.id)) {
          chat.Users[index].status = "online";
          users.get(user.id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("added-user-to-group", {
                chat,
                chatters: [newChatter],
              });
            } catch (error) {}
          });
        }
      });

      //send to new chatter
      if (users.has(newChatter.id)) {
        users.get(newChatter.id).sockets.forEach((socket) => {
          try {
            io.to(socket).emit("added-user-to-group", {
              chat,
              chatters: chat.Users,
            });
          } catch (error) {}
        });
      }
    });

    socket.on("leave-current-chat", (data) => {
      const { chatId, userId, currentUserId, notifyUsers } = data;

      notifyUsers.forEach((id) => {
        if (users.has(id)) {
          users.get(id).sockets.forEach((socket) => {
            try {
              io.to(socket).emit("remove-user-from-chat", {
                chatId,
                userId,
                currentUserId,
              });
            } catch (error) {}
          });
        }
      });
    });

    socket.on("delete-chat", (data) => {
      const { chatId, notifyUsers } = data;

      notifyUsers.forEach((userId) => {
        if (users.has(userId)) {
          users.get(userId).sockets.forEach((socket) => {
            io.to(socket).emit("delete-chat", parseInt(chatId));
          });
        }
      });
    });
  });
};

const getChatters = async (userId) => {
  try {
    const [results, metadata] = await sequelize.query(`
      SELECT "cu"."userId" FROM "ChatUsers" as cu
      INNER JOIN (
        SELECT "c"."id" FROM "Chats" AS c
        WHERE EXISTS (
            SELECT "u"."id" FROM "Users" as u
            INNER JOIN "ChatUsers" ON u.id = "ChatUsers"."userId"
            WHERE u.id = ${parseInt(userId)} AND c.id = "ChatUsers"."chatId"
        )
      ) AS cjoin ON cjoin.id = "cu"."chatId"
      WHERE "cu"."userId" != ${parseInt(userId)}
      `);

    return results.length > 0 ? results.map((el) => el.userId) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = SocketServer;
