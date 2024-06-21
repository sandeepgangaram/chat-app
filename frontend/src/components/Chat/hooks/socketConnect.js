import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  setFriendOffline,
  setFriendOnline,
  setFriendsOnline,
} from "../../../store/actions/chat";

function useSocket(user, dispatch) {
  useEffect(() => {
    const socket = io("http://localhost:8080");

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
  }, [dispatch, user]);
}

export default useSocket;
