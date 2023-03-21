const { createSlice } = require("@reduxjs/toolkit");

const placedItemsSlice = createSlice({
    name: "placeItems",
    initialState: [],
    reducers: {

        addToOder(state, action) {
            const itemIndex = state.findIndex(product => product.id === action.payload.id);
            const len = action.payload.length;
            console.log(action.payload);

            const { singleItem, singleQuantity } = action.payload;

            if (singleQuantity) {
                console.log('first order');

                const temp = { ...singleItem, cartQuantity: singleQuantity, totalPrice: singleItem.price };
                state.push(temp);
            }
            else {
                let TotalOrder = [...state, ...action.payload];
                const cartOrder = action.payload;
                const filtered_total = TotalOrder.filter((item, index) => {
                    return (index === TotalOrder.findIndex(obj => {
                        return item.id === obj.id;
                    }));
                });

                //common element  caret and order items
                const res1 = state.filter((page1) => cartOrder.find(page2 => page1.id === page2.id));
                console.log(res1);

                console.log('Cart');
                console.log(filtered_total);

                state.splice(0, state.length);

                state.push(...filtered_total);

            }
        },

        removeOder(state, action) {
            return (
                state.filter((items) => items.id !== action.payload.id)
            );
        },

        incrementQuantity(state, action) {
            const itemIndex = state.findIndex(product => product.id === action.payload.id);
            state[itemIndex].cartQuantity += 1;
            state[itemIndex].totalPrice = state[itemIndex].price * state[itemIndex].cartQuantity;
        },


    }
});

export const { addToOder, removeOder, incrementQuantity, decrementQuantity } = placedItemsSlice.actions;
export default placedItemsSlice.reducer;