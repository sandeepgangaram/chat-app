import { useSelector, useDispatch } from "react-redux";
import Friend from "../Friend/Friend";
import "./FriendList.scss";
import { setCurrentChat } from "../../../../store/actions/chat";
import { Fragment, useState } from "react";
import Modal from "../../../Modal/Modal";
import chatServices from "../../../../services/chatService";

const FriendList = () => {
  const chats = useSelector((state) => state.chatReducer.chats);
  const dispatch = useDispatch();

  const [showFriendsModal, setShowFrindsModal] = useState(false);
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

  const addNewFriend = () => {};
  //dispatch;
  return (
    <div id="friends">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFrindsModal(true)}>ADD</button>
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
        <Modal click={() => setShowFrindsModal(false)}>
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
