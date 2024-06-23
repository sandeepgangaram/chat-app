import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  createChat,
  fetchChats,
  receivedMessage,
  senderTyping,
  setFriendOffline,
  setFriendOnline,
  setFriendsOnline,
  setSocket,
} from "../../../store/actions/chat";

function useSocket(user, dispatch) {
  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => {
        const socket = io("http://localhost:8080");

        dispatch(setSocket(socket));

        socket.emit("join", user);

        socket.on("typing", (user) => {
          console.log("event", user);
        });

        socket.on("friends", (friends) => {
          dispatch(setFriendsOnline(friends));
          console.log("Friends", friends);
        });

        socket.on("online", (friend) => {
          dispatch(setFriendOnline(friend));
          console.log("online", friend);
        });

        socket.on("offline", (friend) => {
          dispatch(setFriendOffline(friend));
          console.log("offline", friend);
        });

        socket.on("received", (message) => {
          dispatch(receivedMessage(message, user.id));
          console.log("received", message);
        });

        socket.on("typing", (sender) => {
          dispatch(senderTyping(sender));
          console.log("typing", sender);
        });

        socket.on("new-chat", (chat) => {
          dispatch(createChat(chat));
          console.log("new-chat", chat);
        });
      })
      .catch((e) => console.log(e));
  }, [dispatch, user]);
}

export default useSocket;
