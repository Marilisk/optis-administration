import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productsSlice from "./productsSlice";
import lensesSlice from "./lensesSlice";
import administrateSlice from "./administrateSlice";
import photosSlice from "./photosSlice";
import ordersSlice from "./ordersSlice";
import featuresSlice from "./featuresSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        auth: authSlice,
        lenses: lensesSlice,
        administrate: administrateSlice,
        orders: ordersSlice,
        photos: photosSlice,
        filters: featuresSlice,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch