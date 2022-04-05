import {RootState} from "../../store";

export const getActiveBoard = (state: RootState) => state.board.active
export const getAllBoard = (state: RootState) => state.board.boards