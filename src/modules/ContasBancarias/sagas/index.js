import { takeLatest, call, put } from 'redux-saga/effects';
import { ContasBancariasApi } from 'services/api';
import { AppTypes } from 'redux/reducers/AppReducers';
import { Types } from '../redux';

const { CONTASBANCARIAS } = Types;

function* loadcontasbancarias({ params }) {
    try {
        const result = yield call(ContasBancariasApi.get, params);
        yield put({ type: CONTASBANCARIAS.LOAD_SUCCESS, payload: result.data });
    } catch (e) {
        yield put({ type: CONTASBANCARIAS.LOAD_FAILED });
        yield put({ type: AppTypes.APP_ERROR_MESSAGE, payload: e.response.data.message || 'Não foi possível processar a solicitação' });
    }
}

export default function* sagasContasBancarias() {
    yield takeLatest(CONTASBANCARIAS.LOAD, loadcontasbancarias);
}
