import React, {useEffect} from 'react';
import {useAppDispatch} from "./store/store";
import {fetchMe, fetchUsers} from "./store/ducks/users/reducer";
import {fetchBoards, fetchTasks} from "./store/ducks/boards/reducer";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchMe())
        dispatch(fetchBoards())
        dispatch(fetchTasks('MAIN'))
    }, [])
    return (
        <div className="App">
            <Header/>
            <Dashboard/>
        </div>
    );
}

export default App;
