import Axios from "./axios-config";

const registerService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/registers");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getRegister: async (id) => {
    let response;
    try {
      response = await Axios.get("/register/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getDoses: async () => {
    let response;
    try {
      response = await Axios.get("/doses");
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addRegister: async (json) => {
    let response;
    try {
      response = await Axios.post("/registers", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editRegister: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/register/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deleteRegister: async (id) => {
    let response;
    try {
      response = await Axios.delete("/register/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default registerService;
