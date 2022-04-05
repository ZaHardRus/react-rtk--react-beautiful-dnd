import {AppBar, Grid, MenuItem, Select, Toolbar, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {useState} from "react";
import {fetchTasks} from "../../store/ducks/boards/reducer";
import {getActiveBoard, getAllBoard} from "../../store/ducks/boards/selectors";

export const Header = () => {
    const dispatch = useAppDispatch()

    const active = useAppSelector(getActiveBoard)
    const boards = useAppSelector(getAllBoard)
    const [activeBoard, setActiveBoard] = useState(active)

    const onChangeBoard = (e: any) => {
        setActiveBoard(e.target.value)
        dispatch(fetchTasks(e.target.value))
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography variant='h5'>
                            Dashboard: {active.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Select
                            id="active"
                            value={activeBoard.id || 1}
                            onChange={onChangeBoard}
                        >
                            <MenuItem disabled value={1}>
                                {"Сменить доску"}
                            </MenuItem>
                            {boards?.map(({id, title}) => {
                                return (
                                    <MenuItem key={id} value={id}>
                                        {title}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}