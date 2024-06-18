import AuthService from "../../services/authService";

export const LOGIN = "login";
export const REGISTER = "register";
export const LOGOUT = "logout";
export const UPDATE_PROFILE = "update_profile";

export const login = (params, history) => (dispatch) => {
  return AuthService.login(params)
    .then((data) => {
      dispatch({ type: LOGIN, payload: data });
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

export const updateProfile = (params) => (dispatch) => {
  return AuthService.updateProfile(params)
    .then((data) => {
      dispatch({ type: UPDATE_PROFILE, payload: data });
    })
    .catch((e) => {
      console.log(e);
    });
};
