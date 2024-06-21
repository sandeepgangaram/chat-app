import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import FriendList from "./components/FriendList/FriendList";
import Messenger from "./components/Messenger/Messenger";
import "./Chat.scss";
import useSocket from "./hooks/socketConnect";
import { fetchChats } from "../../store/actions/chat";

const Chat = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  useSocket(user, dispatch);

  useEffect(() => {
    dispatch(fetchChats())
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }, [dispatch]);
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <Messenger />
      </div>
    </div>
  );
};

export default Chat;
