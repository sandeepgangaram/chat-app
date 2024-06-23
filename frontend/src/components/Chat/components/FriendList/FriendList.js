import { useSelector, useDispatch } from "react-redux";
import Friend from "../Friend/Friend";
import "./FriendList.scss";
import { setCurrentChat } from "../../../../store/actions/chat";
import { Fragment, useState } from "react";
import Modal from "../../../Modal/Modal";
import chatServices from "../../../../services/chatService";

const FriendList = () => {
  const chats = useSelector((state) => state.chatReducer.chats);
  const socket = useSelector((state) => state.chatReducer.socket);
  const dispatch = useDispatch();

  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };

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
      .createChat(id)
      .then((chats) => {
        socket.emit("add-friend", chats);
        setShowFriendsModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="friends">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendsModal(true)}>ADD</button>
      </div>
      <hr />
      <div id="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
            );
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
      {showFriendsModal ? (
        <Modal onClick={() => setShowFriendsModal(false)}>
          <Fragment key="header">
            <h3 className="m-0">Create new chat</h3>
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
    </div>
  );
};
export default FriendList;
