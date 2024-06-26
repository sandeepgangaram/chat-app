import "./Message.scss";

const Message = ({ user, chat, message, index }) => {
  const determineMarginBetweenMessages = () => {
    if (index + 1 === chat.Messages.length) return;

    return message.fromUserId === chat.Messages[index + 1].fromUserId
      ? "mb-5"
      : "mb-10";
  };
  return (
    <div
      className={`message ${determineMarginBetweenMessages()} ${
        message.fromUserId === user.id ? "creator" : ""
      }`}
    >
      <div
        className={message.fromUserId === user.id ? "owner" : "other-person"}
      >
        {message.fromUserId !== user.id ? (
          <h6 className="m-0">
            {message.User.firstName} {message.User.lastName}
          </h6>
        ) : null}
        {message.type === "text" ? (
          <p className="m-0">{message.message}</p>
        ) : (
          <img src={message.message} alt="User upload" />
        )}
      </div>
    </div>
  );
};

export default Message;
