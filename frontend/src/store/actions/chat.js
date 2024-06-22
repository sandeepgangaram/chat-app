import chatService from "../../services/chatService";

export const FETCH_CHATS = "fetch_chats";
export const SET_CURRENT_CHAT = "set_current_chat";
export const SET_FRIENDS_ONLINE = "set_friends_online";
export const SET_FRIEND_ONLINE = "set_friend_online";
export const SET_FRIEND_OFFLINE = "set_friend_offline";
export const SET_SOCKET = "set_socket";
export const RECEIVED_MESSAGE = "received_message";
export const SENDER_TYPING = "sender_typing";
export const PAGINATE_MESSAGS = "paginate_messages";
export const INCREMENT_SCROLL = "increment_scroll";

export const fetchChats = () => (dispatch) => {
  return chatService
    .fetchChats()
    .then((data) => {
      data.forEach((chat) => {
        chat.Users.forEach((user) => {
          user.status = "offline";
        });

        chat.Users.reverse();
      });
      dispatch({ type: FETCH_CHATS, payload: data });
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export const setCurrentChat = (chat) => (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};

export const setFriendsOnline = (friends) => (dispatch) => {
  dispatch({ type: SET_FRIENDS_ONLINE, payload: friends });
};

export const setFriendOnline = (friend) => (dispatch) => {
  dispatch({ type: SET_FRIEND_ONLINE, payload: friend });
};

export const setFriendOffline = (friend) => (dispatch) => {
  dispatch({ type: SET_FRIEND_OFFLINE, payload: friend });
};

export const setSocket = (socket) => (dispatch) => {
  dispatch({ type: SET_SOCKET, payload: socket });
};

export const receivedMessage = (message, userId) => (dispatch) => {
  dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } });
};

export const senderTyping = (sender) => (dispatch) => {
  dispatch({ type: SENDER_TYPING, payload: sender });
};

export const paginateMessages = (id, page) => (dispatch) => {
  return chatService
    .paginateMessages(id, page)
    .then(({ messages, pagination }) => {
      if (messages != null && messages.length > 1) {
        messages.reverse();
        const payload = { messages, id, pagination };
        dispatch({ type: PAGINATE_MESSAGS, payload });
        return true;
      }
      return false;
    })
    .catch((err) => {
      throw err;
    });
};

export const incrementScroll = () => (dispatch) => {
  dispatch({ type: INCREMENT_SCROLL });
};
