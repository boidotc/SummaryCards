import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cards/';


// A updater avec les routes dans le backend
class CardService {
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(API_URL + id);
  }

  create(data) {
    return axios.post(API_URL, data);
  }

  update(id, data) {
    return axios.put(API_URL + id, data);
  }

  delete(id) {
    return axios.delete(API_URL + id);
  }

  deleteAll() {
    return axios.delete(API_URL);
  }

}

export default new CardService();
