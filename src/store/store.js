
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import placeIdtemsSliceReducer from "./placeIdtemsSlice";


const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        placeItem: placeIdtemsSliceReducer
    }
});

export default store;