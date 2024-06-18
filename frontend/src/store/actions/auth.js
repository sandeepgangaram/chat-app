import AuthService from "../../services/authService";
import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "./types";

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
