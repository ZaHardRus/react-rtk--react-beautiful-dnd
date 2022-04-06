import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {instance} from "../../../axios/instance";
import {RootState} from "../../store";

interface IBoardState {
    boards: Array<IBoard> | null
    active: IBoard
    isLoading: boolean
    error: string
}

const initialState: IBoardState = {
    boards: null,
    active: {} as IBoard,
    isLoading: false,
    error: ''
}
export const fetchBoards = createAsyncThunk(
    'boards/fetchAll',
    async (payload, thunkApi) => {
        try {
            const response = await instance.get('boards')
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue('Ошибка при запросе всех досок')
        }
    }
)
export const fetchTasks = createAsyncThunk(
    'boards/fetchTasks',
    async (payload: string, thunkApi) => {
        try {
            const {data: activeBoard} = await instance.get(`boards/${payload}`)
            return activeBoard
        } catch (e) {
            return thunkApi.rejectWithValue('Ошибка при запросе всех досок')
        }
    }
)
export const moveTask1 = createAsyncThunk(
    'boards/moveTask1',
    async (payload: any, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(moveTask(payload))
            const state: any = getState() as RootState
            const boardId: string = state.board.active.id
            const newValue: Array<IBoardSection> = state.board.active.tickets
            const {data} = await instance.patch(`boards/${boardId}`, {id: boardId, tickets: newValue})
            return data
        } catch (e) {
            return rejectWithValue('Ошибка при запросе всех доски')
        }
    },
)
export const addTask1 = createAsyncThunk(
    'boards/addTask1',
    async (payload: any, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(addTask(payload))
            const state: any = getState() as RootState
            const boardId: string = state.board.active.id
            const newValue: Array<IBoardSection> = state.board.active.tickets
            const {data} = await instance.patch(`boards/${boardId}`, {id: boardId, tickets: newValue})
            return data
        } catch (e) {
            return rejectWithValue('Ошибка при запросе всех доски')
        }
    },
)
export const removeTask1 = createAsyncThunk(
    'boards/removeTask1',
    async (payload: any, {dispatch, getState, rejectWithValue}) => {
        try {
            dispatch(removeTask(payload))
            const state: any = getState() as RootState
            const boardId: string = state.board.active.id
            const newValue: Array<IBoardSection> = state.board.active.tickets
            const {data} = await instance.patch(`boards/${boardId}`, {id: boardId, tickets: newValue})
            return data
        } catch (e) {
            return rejectWithValue('Ошибка при запросе всех доски')
        }
    },
)

export const BoardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        moveTask: (state, action) => {
            const fromSection = state.active.tickets.find(section => section.id === action.payload.source.droppableId);
            const toSection = state.active.tickets.find(section => section.id === action.payload.destination.droppableId);

            const taskToMoveIndex: any = fromSection?.tasks.findIndex(task => task.id === action.payload.taskId);
            const [task]: any = fromSection?.tasks?.splice(taskToMoveIndex, 1);
            toSection?.tasks.splice(action.payload.destination.index, 0, task)
        },
        addTask: (state, action) => {
            state.active.tickets.forEach((column:any)=> {
                if (column.id === action.payload.id){
                    column.tasks.push(action.payload.data)
                }
            })
        },
        removeTask: (state:any, action) => {
            state.active.tickets = state.active.tickets.map((column:any)=> {
                if (column.id === action.payload.columnId){
                    column.tasks = column.tasks.filter((el:any)=>el.id !== action.payload.taskId)
                }
                return column
            })

            // return {
            //     ...state,
            //     active: {
            //         ...state.active,
            //         tickets: [...state.active.tickets.map((el: any, index: number) => {
            //             if (el.id !== action.payload.columnId) {
            //                 return el
            //             } else {
            //                 return {
            //                     ...state.active.tickets[index], tasks: [...state.active.tickets[index].tasks.filter((task: any) => {
            //                         return task.id !== action.payload.taskId
            //                     })]
            //                 }
            //             }
            //         })]
            //     }
            // }
        }
    },
    extraReducers: {
        [fetchBoards.fulfilled.type]: (state, action: PayloadAction<Array<IBoard>>) => {
            state.isLoading = false
            state.boards = action.payload
            state.active = action.payload[0]
        },
        [fetchBoards.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Произошла ошибка'
        },
        [fetchBoards.pending.type]: (state) => {
            state.isLoading = true
        },

        [fetchTasks.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.active = action.payload
            state.active.tickets = action.payload.tickets
        },
        [fetchTasks.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Произошла ошибка'
        },
        [fetchTasks.pending.type]: (state) => {
            state.isLoading = true
        },

        [moveTask1.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.active = action.payload
            state.isLoading = false
        },
        [moveTask1.rejected.type]: (state) => {
            state.isLoading = false
            state.error = 'Произошла ошибка'
        },
        [moveTask1.pending.type]: (state) => {
            state.isLoading = true
        },
    }
})
export const boardReducer = BoardSlice.reducer
export const {moveTask, addTask,removeTask} = BoardSlice.actions

interface ITask {
    id: string
    title: string
    description: string
    assignee: string
}

interface IBoardSection {
    id: string
    title: string
    tasks: Array<ITask>
}

interface IBoard {
    id: string
    title: string
    tickets: Array<IBoardSection>
}