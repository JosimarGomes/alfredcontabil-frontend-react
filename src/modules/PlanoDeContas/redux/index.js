// types
export const Types = {
    PLANODECONTAS: {
        LOAD: ' planodecontas/load',
        LOAD_SUCCESS: 'planodecontas/loadsuccess',
        LOAD_FAILED: 'planodecontas/loadfailed',
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
export const planodecontasReducers = (state = initialState, action) => {

    switch (action.type) {
    case Types.PLANODECONTAS.LOAD:
        return {
            ...state,
            loading: true,
        };

    case Types.PLANODECONTAS.LOAD_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload,
        };

    case Types.PLANODECONTAS.LOAD_FAILED:
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
export const loadPlanoDeContas = (params = {}) => {
    return {
        type: Types.PLANODECONTAS.LOAD,
        params,
    };
};

// selectors
export const getPlanoDeContas = state => state.planodecontasReducers.data;

export const getLoading = state => state.planodecontasReducers.loading;
