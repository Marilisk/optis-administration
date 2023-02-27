import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LensesInitialStateType, LoadingStatusEnum } from "../types/types";
import instance from "./API/api";

export const fetchLenses = createAsyncThunk('lenses/fetchLenses', async () => {
    const { data } = await instance.get('/lenses');
    return data;
});
export const fetchFilteredProducts = createAsyncThunk('lenses/fetchProducts', async () => {
    const { data } = await instance.get('/lenses');
    return data;
});
export const fetchLens = createAsyncThunk('lenses/fetchLens', async (id:string) => { 
    const data = await instance.get(`/lenses/${id}`);
    return data.data;
});
export const fetchDeleteLens = createAsyncThunk('lenses/fetchDeleteLens', async (id:string) => {
    const data = await instance.delete(`/lenses/` + id);
    console.log(data);
    return {data: data.data, id};
});

 
const initialState:LensesInitialStateType  = {
    products: {
        items: [ ],
        status: LoadingStatusEnum.loaded,
    },

    currentProduct: {item: null, status: LoadingStatusEnum.loaded},
}

const lensesSlice = createSlice({
    name: 'lenses',
    initialState,
    reducers: {
        setCurrentProd(state, action) {
            state.currentProduct.item = action.payload;
            state.currentProduct.status = LoadingStatusEnum.loaded;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchLenses.pending, (state) => {
            state.products.items = [];
            state.products.status = LoadingStatusEnum.loading;
        })
        .addCase(fetchLenses.fulfilled, (state, action) => {
            state.products.items = action.payload;
            state.products.status = LoadingStatusEnum.loaded;
        })
        .addCase(fetchLenses.rejected, (state) => {
            state.products.items = [];
            state.products.status = LoadingStatusEnum.error;
        })


        .addCase(fetchDeleteLens.pending, (state) => {
            state.products.status = LoadingStatusEnum.loading;
        })
        .addCase(fetchDeleteLens.fulfilled, (state, action) => {
            state.products.items = state.products.items.filter( prod => prod._id !== action.payload.id );
            state.currentProduct.status = LoadingStatusEnum.loaded;
        })
        .addCase(fetchDeleteLens.rejected, (state) => {
            state.products.status = LoadingStatusEnum.error;
        })


        .addCase(fetchLens.pending, (state) => {
            state.currentProduct.status = LoadingStatusEnum.loading;
        })
        .addCase(fetchLens.fulfilled, (state, action) => {
            state.currentProduct.item = action.payload;
            state.currentProduct.status = LoadingStatusEnum.loaded;
        })
        .addCase(fetchLens.rejected, (state) => {
            state.currentProduct.status = LoadingStatusEnum.error;
        })

    },
})

export const {
    setCurrentProd
} = lensesSlice.actions;

export default lensesSlice.reducer;