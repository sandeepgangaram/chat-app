import { useEffect } from "react";
import { io } from "socket.io-client";

function useSocket(user, dispatch) {
  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.emit("join", user);

    socket.on("typing", (user) => {
      console.log("event", user);
    });
  }, [dispatch, user]);
}

export default useSocket;
