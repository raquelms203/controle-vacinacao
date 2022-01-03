import Axios from "./axios-config";

const vaccineService = {
  getList: async () => {
    let response;
    try {
      response = await Axios.get("/vaccines");
    } catch (e) {
      return null;
    }
    return response.data;
  },
  getVaccine: async (id) => {
    let response;
    try {
      response = await Axios.get("/vaccine/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },

  addVaccine: async (json) => {
    let response;
    try {
      response = await Axios.post("/vaccines", json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  editVaccine: async (id, json) => {
    let response;
    try {
      response = await Axios.put("/vaccine/" + id, json);
    } catch (e) {
      return null;
    }
    return response.data;
  },
  deleteVaccine: async (id) => {
    let response;
    try {
      response = await Axios.delete("/vaccine/" + id);
    } catch (e) {
      return null;
    }
    return response.data;
  },
};

export default vaccineService;
