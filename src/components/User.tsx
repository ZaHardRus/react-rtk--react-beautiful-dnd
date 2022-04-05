import {Avatar, Box} from "@mui/material"

export const User = ({user}: any) => {
    return (
        <Box display="flex" alignItems="center">
            <Avatar alt={user?.name} src={user?.avatar}/>
            <span style={{padding: 5}}>{user?.name}</span>
        </Box>
    )
}