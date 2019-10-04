export const AppTypes = {
    APP_ERROR_MESSAGE: 'app_error_message',
};

const initialState = {
    errorMessage: null,
};

export const setErrorMessage = (message = null) => {
    return {
        type: AppTypes.APP_ERROR_MESSAGE,
        payload: message,
    };
};

export const appReducers = (state = initialState, action) => {
    switch (action.type) {
    case AppTypes.APP_ERROR_MESSAGE:
        return {
            ...state,
            errorMessage: action.payload,
        };

    default:
        return {
            ...state,
            errorMessage: null,
        };
    }
};

export const getErrorMessage = state => state.appReducers.errorMessage;
