import { useSelector } from "react-redux";
import Message from "../Message/Message";
import "./MessageBox.scss";
import { useEffect, useRef } from "react";

const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);

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
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message">
          <div className="other-person">
            <p className="m-0">
              {senderTyping.fromUser.firstName} {senderTyping.fromUser.lastName}{" "}
              is typing...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MessageBox;
