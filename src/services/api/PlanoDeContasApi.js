import { Request } from 'libs';

export default class PlanoDeContasApi {

    static urlService = 'http://localhost:3001/planodecontas';

    // static formateUrlParams(params) {

    // }

    static get(params = {}) {
        const url = params.id ? `${PlanoDeContasApi.urlService}/${params.id}` : PlanoDeContasApi.urlService;
        return Request.get(url, params);
    }

    static post(params = {}) {
        return Request.post(PlanoDeContasApi.urlService, params);
    }
}
