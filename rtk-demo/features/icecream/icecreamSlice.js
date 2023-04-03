const { cakeActions } = require('../cake/cakeSlice');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numbOfIcecreams: 20
}

const icecreamSlice = createSlice({
    name: 'icecream',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numbOfIcecreams--
        },
        restocked: (state, action) => {
            state.numbOfIcecreams += action.payload
        }
    },
    // extraReducers: {
    //     ['cake/ordered']: (state) => {
    //         state.numbOfIcecreams--;
    //     }
    // }
    extraReducers: (builder) => {
        builder.addCase(cakeActions.ordered, (state) => {
            state.numbOfIcecreams--
        })
    }
})

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;