import { useSelector } from "react-redux";
import Message from "../Message/Message";
import "./MessageBox.scss";

const MessageBox = ({ chat }) => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div id="msg-box">
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
