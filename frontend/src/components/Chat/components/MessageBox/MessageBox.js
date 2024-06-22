import { useSelector } from "react-redux";
import Message from "../Message/Message";
import "./MessageBox.scss";
import { useEffect, useRef } from "react";

const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);

  const msgBoxRef = useRef();

  const scrollManual = (value) => {
    msgBoxRef.current.scrollTop = value;
  };

  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBoxRef.current.scrollHeight);
    }, 100);
  }, [scrollBottom]);

  return (
    <div id="msg-box" ref={msgBoxRef}>
      {chat.Messages.map((message, index) => {
        return (
          <Message
            user={user}
            chat={chat}
            index={index}
            key={message.id}
            message={message}
          />
        );
      })}
    </div>
  );
};

export default MessageBox;
