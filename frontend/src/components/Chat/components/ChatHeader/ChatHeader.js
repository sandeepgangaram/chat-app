import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "../../../Modal/Modal";
import { userStatus } from "../../../../utils/helpers";
import "./ChatHeader.scss";
import chatServices from "../../../../services/chatService";

const ChatHeader = ({ chat }) => {
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const socket = useSelector((state) => state.chatReducer.socket);

  const searchFriends = (e) => {
    chatServices
      .searchUsers(e.target.value)
      .then((res) => {
        setSuggestions(res);
      })
      .catch((err) => {
        throw err;
      });
  };

  const addNewFriend = (id) => {
    chatServices
      .addFriendToGroupChat(id, chat.id)
      .then((data) => {
        socket.emit("add-user-to-group", data);
        setShowAddFriendModal(false);
        setShowChatOptions(false);
      })
      .catch((err) => console.log(err));
  };

  const leaveGroup = () => {
    chatServices
      .leaveGroupChat(chat.id)
      .then((data) => {
        socket.emit("leave-current-chat", data);
        setShowChatOptions(false);
      })
      .catch((e) => console.log(e));
  };

  const deleteChatHandler = () => {
    chatServices
      .deleteChat(chat.id)
      .then((data) => {
        socket.emit("delete-chat", data);
        setShowChatOptions(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info" key={user.id}>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        icon={["fas", "ellipsis-v"]}
        className="fa-icon"
        onClick={() => setShowChatOptions(!showChatOptions)}
      />
      {showChatOptions ? (
        <div id="settings">
          <div onClick={() => setShowAddFriendModal(true)}>
            <FontAwesomeIcon icon={["fas", "user-plus"]} className="fa-icon" />
            <p>Add user to chat</p>
          </div>
          {chat.type === "group" ? (
            <div onClick={leaveGroup}>
              <FontAwesomeIcon
                icon={["fas", "sign-out-alt"]}
                className="fa-icon"
              />
              <p>Leave chat</p>
            </div>
          ) : null}
          {chat.type === "dual" ? (
            <div onClick={deleteChatHandler}>
              <FontAwesomeIcon icon={["fas", "trash"]} className="fa-icon" />
              <p>Delete chat</p>
            </div>
          ) : null}
        </div>
      ) : null}
      {showAddFriendModal ? (
        <Modal onClick={() => setShowAddFriendModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Add friend to group chat</h3>
          </Fragment>
          <Fragment key="body">
            <p>Find friends by typing their name below</p>
            <input
              onInput={searchFriends}
              type="text"
              placeholder="Search..."
            />
            <div id="suggestions">
              {suggestions.map((user) => {
                return (
                  <div key={user.id} className="suggestion">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <button onClick={() => addNewFriend(user.id)}>ADD</button>
                  </div>
                );
              })}
            </div>
          </Fragment>
        </Modal>
      ) : null}
    </Fragment>
  );
};

export default ChatHeader;
