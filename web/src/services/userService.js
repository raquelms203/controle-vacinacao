import Axios from "./axios-config";

const userService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/users");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getUser: async (id) => {
    let response;
    try {
      response = await Axios.get("/user/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addUser: async (json) => {
    let response;
    try {
      response = await Axios.post("/users", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editUser: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/user/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  login: async (json) => {
    let response;
    try {
      response = await Axios.post("/login", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deleteUser: async (id) => {
    let response;
    try {
      response = await Axios.delete("/user/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default userService;
