import Axios from "./axios-config";

const requestService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/requests");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getRequest: async (id) => {
    let response;
    try {
      response = await Axios.get("/request/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addRequest: async (json) => {
    let response;
    try {
      response = await Axios.post("/requests", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editRequest: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/request/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deleteRequest: async (id) => {
    let response;
    try {
      response = await Axios.delete("/request/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default requestService;
