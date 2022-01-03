import Axios from "./axios-config";

const personService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/persons");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getPerson: async (id) => {
    let response;
    try {
      response = await Axios.get("/person/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addPerson: async (json) => {
    let response;
    try {
      response = await Axios.post("/persons", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editPerson: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/person/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deletePerson: async (id) => {
    let response;
    try {
      response = await Axios.delete("/person/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default personService;
