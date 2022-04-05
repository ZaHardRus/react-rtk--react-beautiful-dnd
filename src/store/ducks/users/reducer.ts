import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {instance} from "../../../axios/instance";

interface IUsersState {
    me: null | IUser
    allUsers: Array<IUser>
    isLoading: boolean
    error: string
}

const initialState: IUsersState = {
    me: null,
    allUsers: [],
    isLoading: false,
    error: ''
}
export const fetchUsers = createAsyncThunk(
    'users/fetchAll',
    async (payload, thunkApi) => {
        try {
            const response = await instance.get('users')
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue('Ошибка при запросе всех пользователей')
        }
    }
)
export const fetchMe = createAsyncThunk(
    'users/fetchMe',
    async (payload, thunkApi) => {
        try {
            const response = await instance.get('me')
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue('Ошибка при запросе')
        }
    }
)
export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<Array<IUser>>) => {
            state.isLoading = false
            state.allUsers = action.payload
        },
        [fetchUsers.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Произошла ошибка'
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchMe.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.me = action.payload
        },
        [fetchMe.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Произошла ошибка'
        },
        [fetchMe.pending.type]: (state) => {
            state.isLoading = true
        },
    }
})
export const usersReducer = UsersSlice.reducer

interface IUser {
    id: string
    createdAt: string
    name: string
    avatar: string
}