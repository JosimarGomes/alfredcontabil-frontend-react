import { takeLatest, call, put } from 'redux-saga/effects';
import { PlanoDeContasApi } from 'services/api';
import { Types } from '../redux';

const { PLANODECONTAS } = Types;

function* loadplanodecontas({ params }) {
    try {
        const result = yield call(PlanoDeContasApi.get, params);
        yield put({ type: PLANODECONTAS.LOAD_SUCCESS, payload: result.data });
    } catch (e) {
        yield put({ type: PLANODECONTAS.LOAD_FAILED, payload: e.response.data.message || 'Não foi possível processar a solicitação' });
    }
}

export default function* sagasPlanoDeContas() {
    yield takeLatest(PLANODECONTAS.LOAD, loadplanodecontas);
}
