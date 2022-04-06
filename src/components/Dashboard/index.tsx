import {useAppDispatch, useAppSelector} from "../../store/store";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {Column} from "./Column";
import {moveTask1} from "../../store/ducks/boards/reducer";
import {useCallback, useState} from "react";
import {NewTaskDialog} from "./NewTaskDialog";

export const Dashboard = () => {
    const [dialogVisible, setDialogVisible] = useState({visible: false, sectionId: null})
    const closeDialog = () => {
        setDialogVisible(prev => ({visible: false, sectionId: null}))
    }
    const openDialog = (section: any) => {
        setDialogVisible(prev => ({visible: true, sectionId: section.id}))
    }
    const active = useAppSelector(state => state?.board?.active)
    const dispatch = useAppDispatch()

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: 8,
        minHeight: 500,
    });

    const onDragEnd = useCallback(async (event: any) => {
        if (event.destination == null) {
            return;
        }
        const {source, destination, draggableId: taskId} = event;
        dispatch(moveTask1({newTickets: active?.tickets, taskId, source, destination}))
    }, [])


    return (
        <Box>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container>
                    {active.tickets?.map(section => {
                        return (
                            <Grid item key={section.id} xs>
                                <Paper>
                                    <Box p={2} display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant='h6'>{section.title}</Typography>
                                        <Button variant="outlined" color="primary" onClick={() => openDialog(section)}>
                                            ADD
                                        </Button>
                                    </Box>
                                    <Droppable droppableId={section.id} key={section.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                <Column section={section}/>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </DragDropContext>
            {dialogVisible.visible && <NewTaskDialog open={dialogVisible.visible} sectionId={dialogVisible.sectionId}
                                                     handleClose={closeDialog}/>}
        </Box>
    )
}