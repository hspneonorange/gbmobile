import {createStore} from 'redux';

const initialState = {
    sessionToken: '',
    searchText: '',
}

const reducer = (state = initialState, action) => {
    console.log('reducer', action);

    switch(action.type) {
        case 'HANDLE_AUTHN':
            return Object.assign({}, state, {sessionToken: action.token});
        case 'SEARCH_TEXT_CHANGED':
            return Object.assign({}, state, {searchText: action.text});
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
