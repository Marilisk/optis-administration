import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFileFromList, IOrder, LoadingStatusEnum } from "../types/types";
import instance from "./API/api";



export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
    const response = await instance.get<IOrder[]>('/orders')
    return response.data;
});


export const fetchDeleteOrder = createAsyncThunk('orders/fetchDeleteOrder', async (orderId:string) => {  
    const response = await instance.delete(`/order/${orderId}`);
    console.log(response)
    return {...response.data, orderId}; 
})


export interface IOrdersInitialState {
    orders: {
        items: IOrder [],
        status: LoadingStatusEnum
    }
    deleteImgMessage: string
}

const initialState: IOrdersInitialState = {
    orders: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },
    deleteImgMessage: '',
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.orders.status = LoadingStatusEnum.loading;
        })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.orders.items = action.payload;
                state.orders.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchAllOrders.rejected, (state) => {
                state.orders.items = [];
                state.orders.status = LoadingStatusEnum.error;
            })




            .addCase(fetchDeleteOrder.pending, (state) => {
                state.orders.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchDeleteOrder.fulfilled, (state, action) => {
                state.orders.items = state.orders.items.filter(el => el._id !== action.payload)
                state.orders.status = LoadingStatusEnum.loaded;
                state.deleteImgMessage = 'Изображение удалено'
            })
            .addCase(fetchDeleteOrder.rejected, (state) => {
                state.orders.status = LoadingStatusEnum.error;
                state.deleteImgMessage = 'Ошибка удаления'
            })




    },
})

export const {

} = ordersSlice.actions;

export default ordersSlice.reducer;