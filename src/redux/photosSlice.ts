import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFileFromList, LoadingStatusEnum } from "../types/types";
import instance from "./API/api";


export const fetchPhotos = createAsyncThunk('photos/fetchPhotos', async () => {
    const response = await instance.get<IFileFromList[]>('/photos')
    return response.data;
});

export const fetchImgOwner = createAsyncThunk('photos/fetchImgOwner', async (name: string) => {
    const response = await instance.get(`/photos/owner/${name}`)
    if (response.data.message === 'No product') {
        return { name, product: null }
    }
    return { name, product: response.data }
})

export const fetchDeletePhoto = createAsyncThunk('photos/fetchDeletePhoto', async (name: string) => {
    await instance.delete(`/photos/${name}`)
    return name
});


export interface IPhotoInitialState {
    imgs: {
        items: IFileFromList[],
        status: LoadingStatusEnum
    }
    deleteImgMessage: string
}

const initialState: IPhotoInitialState = {
    imgs: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },
    deleteImgMessage: '',
}

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.pending, (state) => {
            state.imgs.status = LoadingStatusEnum.loading;
        })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.imgs.items = action.payload;
                state.imgs.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchPhotos.rejected, (state) => {
                state.imgs.items = [];
                state.imgs.status = LoadingStatusEnum.error;
            })

            .addCase(fetchImgOwner.pending, (state) => {
                state.imgs.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchImgOwner.fulfilled, (state, action) => {
                const index = state.imgs.items.findIndex(el => el.name === action.payload.name)
                if (index) {
                    const item: IFileFromList = { name: action.payload.name, owner: action.payload.product }
                    state.imgs.items[index] = item
                }
                state.imgs.status = LoadingStatusEnum.loaded;
            })
            .addCase(fetchImgOwner.rejected, (state) => {
                state.imgs.status = LoadingStatusEnum.error;
            })

            .addCase(fetchDeletePhoto.pending, (state) => {
                state.imgs.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchDeletePhoto.fulfilled, (state, action) => {
                state.imgs.items = state.imgs.items.filter(el => el.name !== action.payload)
                state.imgs.status = LoadingStatusEnum.loaded;
                state.deleteImgMessage = 'Изображение удалено'
            })
            .addCase(fetchDeletePhoto.rejected, (state) => {
                state.imgs.status = LoadingStatusEnum.error;
                state.deleteImgMessage = 'Ошибка удаления'
            })

    },
})


export default photosSlice.reducer;