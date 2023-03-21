const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: [],

    reducers: {

        add(state, action) {
            const itemIndex = state.findIndex(product => product.id === action.payload.id);

            if (itemIndex >= 0) {
                state[itemIndex].cartQuantity = state[itemIndex].cartQuantity + 0;
            } else {
                const temp = { ...action.payload, cartQuantity: 1, totalPrice: action.payload.price };
                state.push(temp);
            }
        },

        remove(state, action) {
            return (
                state.filter((items) => items.id !== action.payload.id)
            );
        },

        removeAll(state, action) {
            return state = [];

        },

        incrementQuantity(state, action) {
            const itemIndex = state.findIndex(product => product.id === action.payload.id);
            state[itemIndex].cartQuantity += 1;
            state[itemIndex].totalPrice = state[itemIndex].price * state[itemIndex].cartQuantity;
        },

        decrementQuantity(state, action) {
            const itemIndex = state.findIndex(product => product.id === action.payload.id);

            if (state[itemIndex].cartQuantity === 1) {
                state[itemIndex].cartQuantity = 1;
            } else {
                state[itemIndex].cartQuantity -= 1;
                state[itemIndex].totalPrice = state[itemIndex].price * state[itemIndex].cartQuantity;
            }
        },
    }
});

export const { add, remove, removeAll, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;