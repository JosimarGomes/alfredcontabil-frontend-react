import { combineReducers } from 'redux';
import { movimentacoesReducers } from 'modules/Movimentacoes';
import { planodecontasReducers } from 'modules/PlanoDeContas';
import { contasbancariasReducers } from 'modules/ContasBancarias';
import { appReducers } from './AppReducers';

export default combineReducers({
    movimentacoesReducers,
    planodecontasReducers,
    contasbancariasReducers,
    appReducers,
});
