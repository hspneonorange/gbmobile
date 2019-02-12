import {createStore} from 'redux';

const initialState = {
    sessionToken: '',
}

const reducer = (state = initialState, action) => {
    console.log('reducer', action);

    switch(action.type) {
        case 'HANDLE_AUTHN':
            return Object.assign({}, state, {sessionToken: action.token});
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
