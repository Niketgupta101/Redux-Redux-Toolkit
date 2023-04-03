const redux = require('redux');
const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

// ---------------------------------- Constants -----------------------------------------

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';

const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

// ------------------------------------ Action -------------------------------------------
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIcecream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// -------------------------------- Initial State ----------------------------------------
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

//  ------------------------------- Reducer ----------------------------------------------
// (previousState, action) => newState
const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            };
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}
const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            };
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
})

// ------------------------------ Store -----------------------------------------------------

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial State', store.getState());

// ------------------------------ Logic ------------------------------------------------------

// const unsubscribe = store.subscribe(() => console.log('update state', store.getState()));

store.dispatch(orderCake());
store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch);

actions.orderCake();
actions.restockCake(3);

actions.orderIcecream();
actions.restockIcecream(2);

// unsubscribe();