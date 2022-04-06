import {Draggable} from "react-beautiful-dnd";
import {Card} from "@mui/material";
import {Task} from "./Task";

export const Column = ({section}: any) => {
    const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
        return {
            padding: 8,
            fontSize: 10,
            marginBottom: 8,
            ...draggableStyle
        };
    };
    return (
        <div>
            {section?.tasks?.map((task: any, index: any) => {
                return (
                    <Draggable draggableId={task.id} key={task.id} index={index}>
                        {(provided, snapshot) => (
                            <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                                {...provided.dragHandleProps}>
                                <Task task={task} columnId={section.id}/>
                            </Card>
                        )}
                    </Draggable>
                )
            })}
        </div>
    )
};