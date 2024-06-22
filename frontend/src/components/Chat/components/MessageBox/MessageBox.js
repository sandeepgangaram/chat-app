import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "../Message/Message";
import "./MessageBox.scss";
import { paginateMessages } from "../../../../store/actions/chat";

const MessageBox = ({ chat }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);

  const [loading, setLoading] = useState(false);
  const [scrollUp, setScrollUp] = useState(0);

  const msgBoxRef = useRef();

  const scrollManual = (value) => {
    msgBoxRef.current.scrollTop = value;
  };

  useEffect(() => {
    if (!senderTyping.typing) {
      setTimeout(() => {
        scrollManual(msgBoxRef.current.scrollHeight);
      }, 100);
    }
  }, [scrollBottom, senderTyping.typing]);

  const handleInfiniteScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLoading(true);

      const pagination = chat.Pagination;
      const page = typeof pagination === "undefined" ? 1 : pagination.page;

      dispatch(paginateMessages(chat.id, parseInt(page) + 1))
        .then((res) => {
          if (res) {
            setScrollUp(scrollUp + 1);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (
      senderTyping.typing &&
      msgBoxRef.current.scrollTop > msgBoxRef.current.scrollHeight * 0.3
    ) {
      setTimeout(() => {
        scrollManual(Math.ceil(msgBoxRef.current.scrollHeight));
      }, 100);
    }
  }, [senderTyping.typing]);

  useEffect(() => {
    setTimeout(() => {
      scrollManual(Math.ceil(msgBoxRef.current.scrollHeight * 0.01));
    }, 100);
  }, [scrollUp]);

  return (
    <div onScroll={handleInfiniteScroll} id="msg-box" ref={msgBoxRef}>
      {loading ? (
        <p className="loader m-0">
          <FontAwesomeIcon icon="spinner" className="fa-spin" />
        </p>
      ) : null}
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
