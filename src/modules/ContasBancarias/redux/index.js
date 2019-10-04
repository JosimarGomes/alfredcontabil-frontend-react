// types
export const Types = {
    CONTASBANCARIAS: {
        LOAD: ' contasbancarias/load',
        LOAD_SUCCESS: 'contasbancarias/loadsuccess',
        LOAD_FAILED: 'contasbancarias/loadfailed',
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
export const contasbancariasReducers = (state = initialState, action) => {

    switch (action.type) {
    case Types.CONTASBANCARIAS.LOAD:
        return {
            ...state,
            loading: true,
        };

    case Types.CONTASBANCARIAS.LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };

    case Types.CONTASBANCARIAS.LOAD_FAILED:
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
export const loadContasBancarias = (params = {}) => {
    return {
        type: Types.CONTASBANCARIAS.LOAD,
        params,
    };
};

// selectors
export const getContasBancarias = state => state.contasbancariasReducers.data;

export const getLoading = state => state.contasbancariasReducers.loading;
