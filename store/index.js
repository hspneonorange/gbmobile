import {createStore} from 'redux';
import appConfig from '../appconfig.json';
import actionType from '@constants/actionType';

const initialState = {
    sessionToken: '',
    userId: '',
    searchText: '',
    searchItems: [],
    events: [],
    productDiscount: 0,
    productCart: [],
    salesQueue: [],
    appConfig: appConfig,
    username: '',
    password: '',
    eventId: '',
}

const reducer = (state = initialState, action) => {
    console.log('reducer', action);
    switch(action.type) {
        case actionType.HANDLE_AUTHN:
            return Object.assign({}, state, {sessionToken: action.token, userId: action.userId});
        case actionType.LOGOUT:
            return Object.assign({}, state, {sessionToken: ''});
        case actionType.SEARCH_TEXT_CHANGED:
            return Object.assign({}, state, {searchText: action.text});
        case actionType.RETURN_SEARCH_ITEMS:
            return Object.assign({}, state, {searchItems: action.searchItems});
        case actionType.RETURN_EVENTS:
            return Object.assign({}, state, {events: action.events});
        case actionType.USERNAME_TEXT_CHANGED:
            return Object.assign({}, state, {username: action.text});
        case actionType.PASSWORD_TEXT_CHANGED:
            return Object.assign({}, state, {password: action.text});
        case actionType.SET_EVENT:
            return Object.assign({}, state, {eventId: action.eventId});
        case actionType.UPDATE_USERID:
            return Object.assign({}, state, {userId: action.userId});
        case actionType.ADD_TO_CART:
            let existingItem = state.productCart.find(i => i.id == action.item.id);
            if (existingItem) {
                existingItem.quantity += 1;
                return Object.assign({}, state, {
                    productCart: state.productCart.slice()
                });
            } else {
                action.item.quantity = 1;
                return Object.assign({}, state, {
                    productCart: state.productCart.concat(action.item)
                });
            }
        case actionType.DECREMENT_FROM_CART:
            existingItem = state.productCart.find(i => i.id == action.item.id);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity > 0) {
                    return Object.assign({}, state, {
                        productCart: state.productCart.slice()
                    });
                } else {
                    state.productCart.splice(state.productCart.findIndex(i => i.id == action.item.id), 1);
                    return Object.assign({}, state, {
                        productCart: state.productCart.slice()
                    });
                }
            } else {
                // How can this happen?
            }
        case actionType.REMOVE_FROM_CART:
            state.productCart.splice(state.productCart.findIndex(i => i.id == action.item.id), 1);
            return Object.assign({}, state, {
                productCart: state.productCart.slice()
            });
        case actionType.EMPTY_CART:
            return Object.assign({}, state, {
                productCart: [],
            });
        case actionType.DISCOUNT_KEY_PRESS:
            return Object.assign({}, state, {
                productDiscount: action.discount,
            });
        case actionType.CHECKOUT:
            state.salesQueue = state.salesQueue.concat({
                timeStamp: new Date(),
                userId: state.userId,
                eventId: state.eventId,
                discount: state.discount ? state.discount : 0,
                items: state.productCart.slice(),
            });
            newState = Object.assign({}, state, {
                productDiscount: 0,
                productCart: [],
                salesQueue: state.salesQueue.slice(),
            });
            console.log('New Sales Queue:', state.salesQueue)
            return newState;
        case actionType.CLEAR_STATE_ON_LOGOUT:
            // Wipe everything but salesQueue
            return Object.assign({}, {
                salesQueue: state.salesQueue.slice(),
                appConfig: state.appConfig,
                events: state.events,
            });
        case actionType.UPDATE_SALESQUEUE_ORDER_WITH_ID:
            updateOrder = state.salesQueue.splice(state.salesQueue.findIndex(o => o.timeStamp == action.order.timeStamp), 1)[0];
            console.log('UPDATE_SALESQUEUE_ORDER_WITH_ID::updateOrder', updateOrder);
            updateOrder.id = action.id;
            updateOrder.items.map((i) => {
                i.sale_id = action.id;
            });
            return Object.assign({}, state, {
                salesQueue: state.salesQueue.concat(updateOrder).slice(),
            });
        case actionType.REMOVE_FIRST_ITEM_FROM_SALES_QUEUE:
            updateOrder = state.salesQueue.splice(state.salesQueue.findIndex(o => o.timeStamp == action.order.timeStamp), 1);
            updateOrder.splice(0, 1);
            return Object.assign({}, state, {
                salesQueue: state.salesQueue.concat(updateOrder).slice(),
            })
        default:
            console.log('Reducer reached default: -- misspelled action.type?');
            return state;
    }
}

const store = createStore(reducer);
export default store;
