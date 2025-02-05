import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function Tasks() {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const fetched = useRef(false); // Prevents double fetching

    useEffect(() => {
        const fetchTasks = async () => {
            if (fetched.current) return; // Prevent second call
            fetched.current = true;

            try {
                const res = await axios.get("http://localhost:5000/api/tasks", {
                    headers: { Authorization: token },
                });
                setTasks(res.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [token]);

    // const handleTaskAdded = (newTask) => {
    //     setTasks([...tasks, newTask]); // Update task list after adding new task
    // };

    return (
        <Container>
           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={3}>
                <Typography variant="h4">Task Manager</Typography>
                <Button variant="contained" color="primary" component={Link} to="/task-form">
                    Add New Task
                </Button>
            </Box>
            <TaskList tasks={tasks} setTasks={setTasks} />
        </Container>
    );
}

export default Tasks;
