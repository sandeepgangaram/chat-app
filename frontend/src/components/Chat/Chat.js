import React from "react";
import { useSelector } from "react-redux";

const Chat = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div>
      <h1>Chat</h1>
      <h3>Hello, {user.firstName}</h3>
    </div>
  );
};

export default Chat;
