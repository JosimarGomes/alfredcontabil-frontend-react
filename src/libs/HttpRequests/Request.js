import Axios from 'axios';

export default class Request {

    static get(url = '', params = {}, config = {}) {
        return Axios.get(url, { config, params });
    }

    static post(url = '', data = {}, config = {}) {
        return Axios.post(url, data, config);
    }

    static put(url = '', data = {}, config = {}) {
        return Axios.put(url, data, config);
    }

    static delete(url = '', config = {}) {
        return Axios.delete(url, config);
    }
}
