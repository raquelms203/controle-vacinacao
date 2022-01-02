import Axios from "./axios-config";

const subjectService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/subjects");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getSubject: async (id) => {
    let response;
    try {
      response = await Axios.get("/subject/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addSubject: async (json) => {
    let response;
    try {
      response = await Axios.post("/subjects", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editSubject: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/subject/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deleteSubject: async (id) => {
    let response;
    try {
      response = await Axios.delete("/subject/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default subjectService;
