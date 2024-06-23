import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";

import "./MessageInput.scss";
import chatServices from "../../../../services/chatService";
import { incrementScroll } from "../../../../store/actions/chat";

const MessageInput = ({ chat }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMessageNotification, setShowMessageNotification] = useState(false);

  const fileUploadRef = useRef();
  const messageInputRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const newMessage = useSelector((state) => state.chatReducer.newMessage);

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };
    //notify other users that this user is typing something
    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    }

    if (value.length === 0) {
      receiver.typing = false;
      socket.emit("typing", receiver);
    }
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") {
      sendMessage(imageUpload);
    }
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };

    setMessage("");
    setImage("");
    setShowEmojiPicker(false);

    //send message with socket
    socket.emit("message", msg);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);

    chatServices
      .uploadChatImage(formData)
      .then((imageUrl) => {
        sendMessage(imageUrl);
      })
      .catch((e) => console.log(e));
  };

  const selectEmoji = ({ emoji }) => {
    const startPostion = messageInputRef.current.selectionStart;
    const endPostion = messageInputRef.current.selectionEnd;
    const emojiLength = emoji.length;
    const value = messageInputRef.current.value;

    setMessage(
      value.substring(0, startPostion) +
        emoji +
        value.substring(endPostion, value.length)
    );

    messageInputRef.current.focus();
    messageInputRef.current.endPostion = endPostion + emojiLength;
  };

  useEffect(() => {
    const msgBox = document.getElementById("msg-box");

    if (
      !newMessage.seen &&
      newMessage.chatId === chat.id &&
      msgBox.scrollHeight !== msgBox.clientHeight
    ) {
      if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
        dispatch(incrementScroll());
      } else {
        setShowMessageNotification(true);
      }
    } else {
      setShowMessageNotification(false);
    }
  }, [newMessage, dispatch]);

  const showNewMessage = () => {
    dispatch(incrementScroll());
    setShowMessageNotification(false);
  };
  return (
    <div id="input-container">
      <div id="image-upload-container">
        <div>
          {showMessageNotification ? (
            <div id="message-notification" onClick={showNewMessage}>
              <FontAwesomeIcon icon="bell" className="fa-icon" />
              <p className="m-0">new message</p>
            </div>
          ) : null}
        </div>
        <div id="image-upload">
          {image.name ? (
            <div id="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                onClick={handleImageUpload}
                icon={"upload"}
                className="fa-icon"
              />
              <FontAwesomeIcon
                onClick={() => setImage("")}
                icon={"times"}
                className="fa-icon"
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            onClick={() => fileUploadRef.current.click()}
            icon={["far", "image"]}
            className="fa-icon"
          />
        </div>
      </div>
      <div id="message-input">
        <input
          ref={messageInputRef}
          type="text"
          value={message}
          placeholder="Message..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          icon={["far", "smile"]}
          className="fa-icon"
        />
      </div>
      <input
        id="chat-image"
        ref={fileUploadRef}
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {showEmojiPicker ? (
        <EmojiPicker
          onEmojiClick={selectEmoji}
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
        />
      ) : // <Picker
      //   // title="Pick your emoji..."
      //   // emoji="point_up"
      //   onEmojiSelect={selectEmoji}
      // />
      null}
    </div>
  );
};

export default MessageInput;
