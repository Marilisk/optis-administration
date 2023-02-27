import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productsSlice from "./productsSlice";
import lensesSlice from "./lensesSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        auth: authSlice,
        lenses: lensesSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch