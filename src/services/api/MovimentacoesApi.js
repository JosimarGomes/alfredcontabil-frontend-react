import { Request } from 'libs';

export default class MovimentacoesApi {

    static urlService = 'http://localhost:3001/movimentacoes';

    // static formateUrlParams(params) {

    // }

    static get(params = {}) {
        const url = params.id ? `${MovimentacoesApi.urlService}/${params.id}` : MovimentacoesApi.urlService;
        return Request.get(url, params);
    }

    static post(params = {}) {
        return Request.post(MovimentacoesApi.urlService, params);
    }

    static put(params = {}) {
        const url = params.id ? `${MovimentacoesApi.urlService}/${params.id}` : MovimentacoesApi.urlService;
        return Request.put(url, params);
    }
}
