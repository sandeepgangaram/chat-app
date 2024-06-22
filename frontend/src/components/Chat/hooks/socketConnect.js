import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  fetchChats,
  receivedMessage,
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

        console.log(res);
      })
      .catch((e) => console.log(e));
  }, [dispatch, user]);
}

export default useSocket;
