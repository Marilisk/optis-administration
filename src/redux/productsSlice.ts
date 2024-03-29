import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatusEnum, ProdInitialStateType } from "../types/types";
import instance from "./API/api";


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const { data } = await instance.get('/products');
        return data;
    });

export const fetchProd = createAsyncThunk('products/fetchProd', async (id: string) => {
    const data = await instance.get(`/products/${id}`);
    return data.data;
});

export const fetchDeleteProd = createAsyncThunk('products/fetchDeleteProd', async (id: string) => {
    const data = await instance.delete(`/products/` + id);
    return { data: data.data, id };
});

export const fetchSearch = createAsyncThunk('products/fetchSearch', async (query: string) => {
    const response = await instance.post(`/products/search`, { query });
    return response.data;
});


const initialState: ProdInitialStateType = {
    products: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    currentProduct: { item: null, status: LoadingStatusEnum.loaded },
    searchResult: { items: [], status: LoadingStatusEnum.loaded },
    tags: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    alarmWindow: {
        isShown: false,
        text: '',
        confirmed: false,
    },

    /* currentCartWithSums: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    processedOrder: {
        order: null,
        status: LoadingStatusEnum.loaded,
    },

    cartInLSLength: 0, */

}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentProd(state, action) {
            state.currentProduct.item = action.payload;
            state.currentProduct.status = LoadingStatusEnum.loaded
        },

        setLoadingStatus(state, action) {
            state.currentProduct.status = action.payload
        },

        showAlarmWindow(state, action) {
            state.alarmWindow.text = action.payload.text
            state.alarmWindow.isShown = action.payload.isShown
        },

        confirmDelete(state) {
            state.alarmWindow.confirmed = true
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.products.status = LoadingStatusEnum.loading;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.items = action.payload;
                state.products.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.products.items = [];
                state.products.status = LoadingStatusEnum.error;
            })

            .addCase(fetchDeleteProd.pending, (state) => {
                state.products.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchDeleteProd.fulfilled, (state, action) => {
                state.products.items = state.products.items.filter(prod => prod._id !== action.payload.id);
                state.currentProduct.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchDeleteProd.rejected, (state) => {
                state.products.status = LoadingStatusEnum.error;
            })

            .addCase(fetchProd.pending, (state) => {
                state.currentProduct.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchProd.fulfilled, (state, action) => {
                state.currentProduct.item = action.payload;
                state.currentProduct.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchProd.rejected, (state) => {
                state.products.status = LoadingStatusEnum.error;

            })

            .addCase(fetchSearch.pending, (state) => {
                state.searchResult.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.searchResult.items = action.payload;
                state.searchResult.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchSearch.rejected, (state) => {
                state.products.status = LoadingStatusEnum.error;

            })

    },
})

export const {
    setCurrentProd,
    setLoadingStatus,
    showAlarmWindow,
    confirmDelete,
} = productsSlice.actions;

export default productsSlice.reducer;