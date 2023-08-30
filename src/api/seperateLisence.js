import axios from "./index";

class SeperateLisences {
  get = () => axios.get(`admin-separate-licenses`);
  add = (data) => axios.post(`admin-separate-licenses`, data);
  delete = (id) => axios.delete(`admin-separate-licenses/${id}`);
}

export default new SeperateLisences();