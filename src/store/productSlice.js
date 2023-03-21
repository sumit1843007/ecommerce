const { createSlice } = require("@reduxjs/toolkit");

export const STATUES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUES.IDLE
    },
    reducers: {

        setAllProduct(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }

    }

});

export const { setAllProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

// thunks
export function fetchProducts() {

    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUES.LOADING));

        try {
            const res = await fetch("https://640869422f01352a8a920ca6.mockapi.io/api/v1/Products");
            const data = await res.json();
            // console.log(data);
            dispatch(setAllProduct(data));
            dispatch(setStatus(STATUES.IDLE));

        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUES.ERROR));

        }
    };

}

