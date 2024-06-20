import chatService from "../../services/chatService";

export const FETCH_CHATS = "fetch_chats";

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
