import API from "./api";

const authServices = {
  login: (data) => {
    return API.post("/login", data)
      .then(({ data }) => {
        API.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((e) => {
        console.log("Auth service error", e);
        throw new Error(e.message);
      });
  },
  register: (data) => {
    return API.post("/register", data)
      .then(({ data }) => {
        API.defaults.headers["Authorization"] = `Bearer ${data.token}`;
        return data;
      })
      .catch((e) => {
        console.log("Auth service error", e);
        throw new Error(e.message);
      });
  },
  logout: () => {
    try {
      API.defaults.headers["Authorization"] = "";
    } catch (e) {
      console.log("Auth service error", e);
      throw new Error(e.message);
    }
  },
};

export default authServices;
