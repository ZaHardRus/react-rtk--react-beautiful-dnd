import {useAppSelector} from "../../store/store";
import {Box} from "@mui/material";

export const Dashboard = () => {
    const boards = useAppSelector(state => state.board.boards)
    return(
        
    )
}