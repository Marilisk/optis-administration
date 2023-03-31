import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterType, IOrder, LoadingStatusEnum } from "../types/types";
import instance from "./API/api";

type OrderProperties = keyof IOrder
export interface EditActionI {
    id: string
    property: OrderProperties
    value: string
}

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
    const response = await instance.get<IOrder[]>('/orders')
    return response.data;
});

export const fetchDeleteOrder = createAsyncThunk('orders/fetchDeleteOrder', async (orderId: string) => {
    const response = await instance.delete(`/order/${orderId}`);
    return { ...response.data, orderId };
})

/* export const fetchDeleteAllOrders = createAsyncThunk('orders/fetchDeleteAllOrders', async () => {  
    const response = await instance.delete(`/orders`);
    return response.data; 
}) */

export const fetchEditOrder = createAsyncThunk('auth/fetchEditOrder',
    async (order: IOrder) => {
        const response = await instance.patch(`/adminorder`, order);
        return response.data;
    })

export interface IOrdersInitialState {
    orders: {
        items: IOrder[],
        status: LoadingStatusEnum
    }
    deleteOrderMessage: string
    filters: {
        options: FilterType[]
        chosenOption: FilterType
    }
}

const initialState: IOrdersInitialState = {
    orders: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },
    deleteOrderMessage: '',
    filters: {
        options: [
            { id: 1, name: 'все' }, { id: 2, name: 'за месяц' }, { id: 3, name: 'за неделю' }, { id: 4, name: 'сегодняшние' }],
        chosenOption: { id: 1, name: 'все' },
    },
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        localEditOrder(state, action) {
            let index = state.orders.items.findIndex(order => order._id === action.payload._id)
            state.orders.items.splice(index, 1, action.payload)
        },
        selectFilter(state, action) {
            state.filters.chosenOption = action.payload
        },
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
                state.deleteOrderMessage = 'заказ удалён'
            })
            .addCase(fetchDeleteOrder.rejected, (state) => {
                state.orders.status = LoadingStatusEnum.error;
                state.deleteOrderMessage = 'Ошибка удаления'
            })

            /* .addCase(fetchDeleteAllOrders.pending, (state) => {
                state.orders.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchDeleteAllOrders.fulfilled, (state, action) => {
                state.orders.items = []
                state.orders.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchDeleteAllOrders.rejected, (state) => {
                state.orders.status = LoadingStatusEnum.error;
                state.deleteOrderMessage = 'Ошибка удаления'
            }) */


            .addCase(fetchEditOrder.pending, (state) => {
                state.orders.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchEditOrder.fulfilled, (state, action) => {
                let editedItem = state.orders.items.find(el => el._id === action.payload._id)
                if (editedItem) {
                    editedItem = action.payload
                }
                state.orders.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchEditOrder.rejected, (state) => {
                state.orders.status = LoadingStatusEnum.error;
                state.deleteOrderMessage = 'Ошибка изменения статуса'
            })
    },
})

export const {
    localEditOrder,
    selectFilter,
} = ordersSlice.actions;

export default ordersSlice.reducer;