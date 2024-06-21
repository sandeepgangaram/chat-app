import {
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  SET_FRIENDS_ONLINE,
  SET_FRIEND_OFFLINE,
  SET_FRIEND_ONLINE,
} from "../actions/chat";

const initialState = {
  chats: [],
  currentChat: {},
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
      return {
        ...state,
        currentChat: payload,
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
    default:
      return state;
  }
};

export default chatReducer;
