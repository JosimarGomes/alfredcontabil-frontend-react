import { fork, all } from 'redux-saga/effects';
import { sagasMovimentacoes } from 'modules/Movimentacoes';
import { sagasPlanoDeContas } from 'modules/PlanoDeContas';
import { sagasContasBancarias } from 'modules/ContasBancarias';

export default function* rootSaga() {
    yield all([
        fork(sagasMovimentacoes),
        fork(sagasPlanoDeContas),
        fork(sagasContasBancarias),
    ]);
}
