import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoadingStatusEnum } from "../types/types";
import instance from "./API/api";

export const fetchFilterOptions = createAsyncThunk('administrate/fetchOptions', async (filterName:string) => {
    const { data } = await instance.get(`/${filterName}`);
    return {data, filterName};
})

export interface IOption {
    name: string
    items: string[]
}
export interface IAdministrateSlice {
    options: IOption[]
    status: LoadingStatusEnum
    imagesAmount: number
}

const initialState:IAdministrateSlice = {
    options: [
        {
            name: 'color',
            items: [],
        },
        {
            name: 'shape',
            items: ['круглые', 'прямоугольные', 'квадратные', 'авиаторы', 'cat eye', 'надбровные'],
        },
        {
            name: 'features',
            items: [],
        },
        {
            name: 'material',
            items: ['пластик', 'сталь', 'титан'],
        },
    ],

    status: LoadingStatusEnum.loaded,
    imagesAmount: 0,
    
}


const administrateSlice = createSlice({
    name: 'administrate',
    initialState,
    reducers: {
        addNewOption(state, action) {
            const option = state.options.find(el => el.name === action.payload.name)
            option?.items.push(action.payload.value)
        },
        setImagesAmount(state, action) {
            //console.log(action)
            state.imagesAmount = action.payload
        },        
    },
    extraReducers: (builder) => {
                builder.addCase(fetchFilterOptions.pending, (state) => {
                state.status = LoadingStatusEnum.loading;
        })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                const option = state.options.find(el => el.name === action.payload.filterName)
                if (option) {
                    option.items = action.payload.data
                }
                state.status = LoadingStatusEnum.loaded
            })
            .addCase(fetchFilterOptions.rejected, (state) => {
                state.status = LoadingStatusEnum.error
            })

    },
})

export const {
    addNewOption,
    setImagesAmount,
} = administrateSlice.actions;

export default administrateSlice.reducer;