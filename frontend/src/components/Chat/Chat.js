import React from "react";
import Navbar from "./Navbar/Navbar";

import "./Chat.scss";

const Chat = () => {
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">Data</div>
    </div>
  );
};

export default Chat;
