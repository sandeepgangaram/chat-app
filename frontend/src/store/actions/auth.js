import AuthService from "../../services/authService";

export const LOGIN = "login";
export const REGISTER = "register";
export const LOGOUT = "logout";

export const login = (params, history) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      dispatch({ type: LOGIN, payload: data });
      console.log(data);
      history("/");
    })
    .catch((e) => {
      console.log(e);
    });
};

export const register = (params, history) => (dispatch) => {
  return AuthService.register(params)
    .then((data) => {
      dispatch({ type: REGISTER, payload: data });
      console.log(data);
      history("/");
    })
    .catch((e) => {
      console.log(e);
    });
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};
