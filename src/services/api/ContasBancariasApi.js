import { Request } from 'libs';

export default class ContasBancariasApi {

    static urlService = 'http://localhost:3001/contasbancarias';

    // static formateUrlParams(params) {

    // }

    static get(params = {}) {
        const url = params.id ? `${ContasBancariasApi.urlService}/${params.id}` : ContasBancariasApi.urlService;
        return Request.get(url, params);
    }
}
