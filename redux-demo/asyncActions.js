const redux = require('redux');
const createStore = redux.createStore;

const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');

const thunk = require('redux-thunk').default;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersReq = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fethcUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fethcUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

 // Action Creator

const fetchUsers = () => {
    // below function is not a pure function and can perform side effects such as async operations
    return function(dispatch) {
        dispatch(fetchUsersReq());
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            // response.data is the users
            const users = response.data.map(user =>  user.id);
            dispatch(fethcUsersSuccess(users));
        }).catch(error => {
            dispatch(fethcUsersFailure(error.message));
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());