import {createStore} from 'redux';

const initialState = {
    sessionToken: '',
    searchText: '',
    searchItems: [],
}

const reducer = (state = initialState, action) => {
    console.log('reducer', action);

    switch(action.type) {
        case 'HANDLE_AUTHN':
            return Object.assign({}, state, {sessionToken: action.token});
        case 'SEARCH_TEXT_CHANGED':
            return Object.assign({}, state, {searchText: action.text});
        case 'RETURN_SEARCH_ITEMS':
            return Object.assign({}, state, {searchItems: action.searchItems})
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
