import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {addTask1} from "../../store/ducks/boards/reducer";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    TextField
} from "@mui/material";

export const NewTaskDialog = ({open, sectionId, handleClose}: any) => {
    const [taskState, setTaskState] = useState<any>({
        title: '',
        description: '',
        assignee: ''
    });
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.users.allUsers)

    const updateTaskState = (event: any) => {
        const {value, name} = event.target;

        setTaskState((prevTaskState: any) => ({
            ...prevTaskState,
            [name]: value,
        }));
    }
    const createTask = useCallback((event) => {
        event.preventDefault();
        dispatch(addTask1({id: sectionId, data: {id:Date.now().toString(),...taskState}}))
        handleClose();
    }, [taskState, handleClose, sectionId]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">Creating A New Task:</DialogTitle>
            <form onSubmit={createTask}>
                <DialogContent style={{minWidth: 500}}>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            required
                            type='text'
                            name='title'
                            label='Title'
                            onChange={updateTaskState}
                            value={taskState?.title || ''}
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            required
                            fullWidth
                            type='text'
                            multiline
                            name='description'
                            label='Description'
                            onChange={updateTaskState}
                            value={taskState?.description || ''}
                        />
                    </Box>
                    <Box p={1}>
                        <FormControl fullWidth>
                            <InputLabel shrink>
                                Assignee
                            </InputLabel>
                            <Select
                                required
                                style={{
                                    width: '100%'
                                }}
                                native
                                name='assignee'
                                value={taskState?.assignee || ''}
                                onChange={updateTaskState}
                            >
                                <option value={''} disabled>–</option>
                                {users?.map((user: any) => {
                                    return (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button type="submit" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}