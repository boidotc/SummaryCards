import axios from 'axios';
import { DbAddressApi as API_URL} from '../config';

// A updater avec les routes dans le backend
class CardService {
  getAll() { //dev
    return axios.get(API_URL);
  }

  get(id) { //dev
    return axios.get(API_URL + id);
  }

  create(data) { //dev
    return axios.post(API_URL, data);
  }

  update(id, data) {
    return axios.put(API_URL + id, data);
  }

  delete(id) { //dev
    return axios.delete(API_URL + id);
  }

  deleteAll() {
    return axios.delete(API_URL);
  }

  getPdf(id) {
    return axios.get(API_URL+"pdf/"+id, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'arraybuffer'
    });
  }

}

export default new CardService();
