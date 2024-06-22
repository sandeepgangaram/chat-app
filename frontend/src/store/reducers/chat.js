import {
  FETCH_CHATS,
  RECEIVED_MESSAGE,
  SENDER_TYPING,
  SET_CURRENT_CHAT,
  SET_FRIENDS_ONLINE,
  SET_FRIEND_OFFLINE,
  SET_FRIEND_ONLINE,
  SET_SOCKET,
  senderTyping,
} from "../actions/chat";

const initialState = {
  chats: [],
  currentChat: {},
  socket: {},
  newMessage: { chatId: null, seen: null },
  scrollBottom: 0,
  senderTyping: { typing: false },
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case SET_CURRENT_CHAT:
      //sort messages
      payload.Messages = payload.Messages.sort((a, b) => a.id - b.id);
      return {
        ...state,
        currentChat: payload,
        newMessage: { chatId: null, seen: null },
        scrollBottom: state.scrollBottom + 1,
      };
    case SET_FRIENDS_ONLINE: {
      const updatedChats = state.chats.map((chat) => {
        return {
          ...chat,
          Users: chat.Users.map((user) => {
            if (payload.includes(user.id)) {
              return {
                ...user,
                status: "online",
              };
            }
            return user;
          }),
        };
      });

      return {
        ...state,
        chats: updatedChats,
      };
    }

    case SET_FRIEND_ONLINE: {
      let currentChatCopy = { ...state.currentChat };

      const updatedChats = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === parseInt(payload.id)) {
            return {
              ...user,
              status: "online",
            };
          }
          return user;
        });

        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users,
          };
        }

        return {
          ...chat,
          Users,
        };
      });

      return {
        ...state,
        chats: updatedChats,
        currentChat: currentChatCopy,
      };
    }

    case SET_FRIEND_OFFLINE: {
      let currentChatCopy = { ...state.currentChat };

      const updatedChats = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === parseInt(payload.userId)) {
            return {
              ...user,
              status: "offline",
            };
          }
          return user;
        });

        if (chat.id === currentChatCopy.id) {
          currentChatCopy = {
            ...currentChatCopy,
            Users,
          };
        }

        return {
          ...chat,
          Users,
        };
      });

      return {
        ...state,
        chats: updatedChats,
        currentChat: currentChatCopy,
      };
    }

    case SET_SOCKET:
      return {
        ...state,
        socket: payload,
      };

    case RECEIVED_MESSAGE: {
      const { message, userId } = payload;
      let currentChatCopy = { ...state.currentChat };
      let newMessage = { ...state.newMessage };
      let scrollBottom = state.scrollBottom;

      const chatsCopy = state.chats.map((chat) => {
        if (message.chatId === chat.id) {
          if (message.User.id === userId) {
            scrollBottom++;
          } else {
            newMessage = {
              chatId: chat.id,
              seen: false,
            };
          }

          if (message.chatId === currentChatCopy.id) {
            currentChatCopy = {
              ...currentChatCopy,
              Messages: [...currentChatCopy.Messages, message],
            };
          }

          return {
            ...chat,
            Messages: [...chat.Messages, message],
          };
        }
        return chat;
      });

      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
        newMessage,
        scrollBottom, //TBR
        senderTyping: { typing: false },
      };
    }

    case SENDER_TYPING: {
      let scrollBottomCopy = state.scrollBottom;

      if (payload.isTyping) {
        scrollBottomCopy = scrollBottomCopy + 1;
      }

      return {
        ...state,
        senderTyping: payload,
        scrollBottom: scrollBottomCopy,
      };
    }
    default:
      return state;
  }
};

export default chatReducer;
