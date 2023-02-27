import { createAppAsyncThunk } from './hooks';
import { RootState } from './redux-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthInitStateType, LoadingStatusEnum } from '../types/types';
import instance, { API_URL } from './API/api';

export type AuthValuesType = {
    email: string
    password: string
}
export type RegisterValuesType = {
    email: string
    password: string
    fullName: string
}

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params:AuthValuesType) => {
    let response = await instance.post('/auth/login', params);
    localStorage.setItem('token', response.data.accessToken)
    return response;
})

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
    let response = await instance.post('/auth/logout');
    localStorage.removeItem('token')
    return response.data;
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {  // refreshes tokens and login data
    try {
        const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.tokens.accessToken);
        return response.data.user;
    } catch (error) {
        console.log(error)
    }
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params:RegisterValuesType) => {
    let response = await instance.post('/auth/register', params);
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('loginData', JSON.stringify(params))
    return response.data.user;
})

const initialState: AuthInitStateType = {
    loginData: {
        data: null,
        status: LoadingStatusEnum.loaded,
        serverMessage: '',
    },
    subscribeData: {
        email: '',
        responseMsg: '',
    },
    totalCartSum: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.loginData.status = LoadingStatusEnum.loading
        })
            .addCase(fetchAuth.fulfilled, (state, action/* :PayloadAction<string[]> */) => {
                console.log(action)

                state.loginData.status = LoadingStatusEnum.loaded;
                state.loginData.data = action.payload.data.user;
                //localStorage.setItem('token', action.payload.data.accessToken)
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                console.log(action)
                state.loginData.status = LoadingStatusEnum.error;
                if (action.error.message === 'Request failed with status code 400') {
                    state.loginData.serverMessage = 'неверный логин или пароль' ;
                } else {
                    state.loginData.serverMessage = 'сервис недоступен' ;
                }
            })

            .addCase(fetchLogout.pending, (state) => {
                state.loginData.status = LoadingStatusEnum.loading;
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.loginData.status = LoadingStatusEnum.loaded;
                state.loginData.data = null;
            })
            .addCase(fetchLogout.rejected, (state) => {
                state.loginData.status = LoadingStatusEnum.error;
            })

            .addCase(checkAuth.pending, (state) => {
                state.loginData.status = LoadingStatusEnum.loading;
                state.loginData.data = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loginData.status = LoadingStatusEnum.loaded;
                state.loginData.data = action.payload;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loginData.status = LoadingStatusEnum.error;
                state.loginData.data = null;
            })

            .addCase(fetchRegister.pending, (state) => {
                state.loginData.status = LoadingStatusEnum.loading;
                state.loginData.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loginData.status = LoadingStatusEnum.loaded;
                state.loginData.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.loginData.status = LoadingStatusEnum.error;
                state.loginData.data = null;
            })

            
  
        
    },

});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.loginData.data);
export const selectIsManager = (state: RootState) => Boolean(state.auth.loginData.data?.role === 'ADMIN');



export const { } = authSlice.actions;
export default authSlice.reducer;