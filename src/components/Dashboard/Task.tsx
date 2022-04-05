import {CardContent, Typography} from "@mui/material";
import {User} from "../User";
import {useAppSelector} from "../../store/store";


export const Task = ({task = {}}: any) => {
    const users = useAppSelector(state => state.users.allUsers)
    const currentUser = users.find(el => task.assignee === el.id)
    return (

        <CardContent style={{padding: 0}}>
            <Typography color="textPrimary" gutterBottom style={{fontSize: 10}}>
                {task?.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom style={{fontSize: 10}}>
                {task?.description}
            </Typography>
            <User user={currentUser}/>
        </CardContent>
    )
}