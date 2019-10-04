import { takeLatest, call, put } from 'redux-saga/effects';
import { MovimentacoesApi } from 'services/api';
import { AppTypes } from 'redux/reducers/AppReducers';
import { Types } from '../redux';

const { MOVIMENTACOES } = Types;

function* loadmovimentacoes({ params }) {
    try {
        const result = yield call(MovimentacoesApi.get, params);
        yield put({ type: MOVIMENTACOES.LOAD_SUCCESS, payload: result.data });
    } catch (e) {
    console.log("caiu no epics failde")
        yield put({ type: MOVIMENTACOES.LOAD_FAILED });
        yield put({ type: AppTypes.APP_ERROR_MESSAGE, payload: e.response.data.message || 'Não foi possível processar a solicitação' });
    }
}

export default function* sagasMovimentacoes() {
    yield takeLatest(MOVIMENTACOES.LOAD, loadmovimentacoes);
}
