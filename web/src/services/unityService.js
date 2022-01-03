import Axios from "./axios-config";

const personService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/unities");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getUnity: async (id) => {
    let response;
    try {
      response = await Axios.get("/unity/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addUnity: async (json) => {
    let response;
    try {
      response = await Axios.post("/unities", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editUnity: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/unity/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deleteUnity: async (id) => {
    let response;
    try {
      response = await Axios.delete("/unity/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default personService;
