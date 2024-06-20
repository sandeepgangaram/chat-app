import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar/Navbar";
import FriendList from "../FriendList/FriendList";
import Messenger from "../Messenger/Messenger";
import "./Chat.scss";
import { fetchChats } from "../../store/actions/chat";

const Chat = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.authReducer.user);

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
