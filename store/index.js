import {createStore} from 'redux';
import appConfig from '../appconfig.json';

const initialState = {
    sessionToken: '',
    searchText: '',
    searchItems: [],
    events: [],
    productCart: [],
    appConfig: appConfig,
    username: '',
    password: '',
    event: '',
}

const reducer = (state = initialState, action) => {
    console.log('reducer', action);

    switch(action.type) {
        case 'HANDLE_AUTHN':
            return Object.assign({}, state, {sessionToken: action.token});
        case 'LOGOUT':
            return Object.assign({}, state, {sessionToken: ''});
        case 'SEARCH_TEXT_CHANGED':
            return Object.assign({}, state, {searchText: action.text});
        case 'RETURN_SEARCH_ITEMS':
            return Object.assign({}, state, {searchItems: action.searchItems});
        case 'RETURN_EVENTS':
            return Object.assign({}, state, {events: action.events});
        case 'USERNAME_TEXT_CHANGED':
            return Object.assign({}, state, {username: action.text});
        case 'PASSWORD_TEXT_CHANGED':
            return Object.assign({}, state, {password: action.text});
        case 'SET_EVENT':
            return Object.assign({}, state, {event:action.event}); //finish this lmao
        case 'ADD_TO_CART':
//            newCart = state.productCart.push(action.item);
            console.log(state.productCart);
            return Object.assign({}, state, {
                productCart: state.productCart.concat(action.item)
            }); // hopefully this works?
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
