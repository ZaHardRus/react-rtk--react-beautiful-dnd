import {Button, CardContent, Typography} from "@mui/material";
import {User} from "../User";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {removeTask, removeTask1} from "../../store/ducks/boards/reducer";


export const Task = ({task = {},columnId}: any) => {
    const users = useAppSelector(state => state.users.allUsers)
    const active = useAppSelector(state => state.board.active)
    const currentUser = users.find(el => task.assignee === el.id)
    const dispatch = useAppDispatch()
    const removeHandler = () => {
        dispatch(removeTask1({taskId:task.id,columnId}))
    }
    return (
        <CardContent style={{padding: 0}}>
            <Typography color="textPrimary" gutterBottom style={{fontSize: 10}}>
                {task?.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom style={{fontSize: 10}}>
                {task?.description}
            </Typography>
            <div style={{display:"flex",justifyContent:'space-between'}}>
                <User user={currentUser}/>
                <Button onClick={removeHandler}>X</Button>
            </div>
        </CardContent>
    )
}