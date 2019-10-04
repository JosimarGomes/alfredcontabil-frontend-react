// types
export const Types = {
    MOVIMENTACOES: {
        LOAD: ' movimentacoes/load',
        LOAD_SUCCESS: 'movimentacoes/loadsuccess',
        LOAD_FAILED: 'movimentacoes/loadfailed',
    },
};

const initialState = {
    data: {
        rows: [],
        count: 0,
    },
    loading: false,
};

// reducers
export const movimentacoesReducers = (state = initialState, action) => {

    switch (action.type) {
    case Types.MOVIMENTACOES.LOAD:
        return {
            ...state,
            loading: true,
        };

    case Types.MOVIMENTACOES.LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };

    case Types.MOVIMENTACOES.LOAD_FAILED:
        return {
            ...state,
            loading: false,
        };

    default:
        return {
            ...state,
            loading: false,
        };
    }
};

// action creators
export const loadMovimentacoes = (params = {}) => {
    return {
        type: Types.MOVIMENTACOES.LOAD,
        params,
    };
};

// selectors
export const getMovimentacoes = state => state.movimentacoesReducers.data;

export const getLoading = state => state.movimentacoesReducers.loading;
