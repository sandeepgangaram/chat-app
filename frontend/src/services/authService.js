import API from "./api";

const authServices = {
  login: (data) => {
    return API.post("/login", data)
      .then(({ data }) => {
        setHeadersAndStorage(data);
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
        setHeadersAndStorage(data);
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (e) {
      console.log("Auth service error", e);
      throw new Error(e.message);
    }
  },

  updateProfile: (data) => {
    const headers = {
      headers: ["Content-Type", "application/x-www-form-urlencoded"],
    };
    return API.put("/users/update", data, headers)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      })
      .catch((e) => {
        console.log("Auth service error", e);
        throw new Error(e.message);
      });
  },
};

const setHeadersAndStorage = ({ user, token }) => {
  API.defaults.headers["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};
export default authServices;
