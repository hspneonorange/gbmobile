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
            return Object.assign({}, state, {event:action.event});
        case 'ADD_TO_CART':
            // TODO: Logic to increment/decrement quantity instead of just adding new line items
            let existingItem = state.productCart.find(i => i.id == action.item.id);
            console.log("existingItem", existingItem);
            if (existingItem) {
                console.log("existing item; increment quantity")
                existingItem.quantity += 1;
                return Object.assign({}, state, {
                    productCart: state.productCart.slice()
                })
            } else {
                console.log("non-existing item; set quantity to 1")
                action.item.quantity = 1;
                return Object.assign({}, state, {
                    productCart: state.productCart.concat(action.item)
                });
            }
        case 'DECREMENT_FROM_CART':
            existingItem = state.productCart.find(i => i.id == action.item.id);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity > 0) {
                    return Object.assign({}, state, {
                        productCart: state.productCart.slice()
                    })
                } else {
                    state.productCart.splice(state.productCart.findIndex(i => i.id == action.item.id), 1);
                    return Object.assign({}, state, {
                        productCart: state.productCart.slice()
                    })
                }
            } else {
                // How can this happen?
            }
        case 'REMOVE_FROM_CART':
            state.productCart.splice(state.productCart.findIndex(i => i.id == action.item.id), 1);
            return Object.assign({}, state, {
                productCart: state.productCart.slice()
            })
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;
