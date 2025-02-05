import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { toast } from "react-toastify";

function TaskForm() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams(); // Get task ID if editing
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const fetched = useRef(false); // Prevents double fetching

    useEffect(() => {
        if (id) {
            if (fetched.current) return; // Prevent second call
            fetched.current = true;

            // Fetch task details if editing
            axios.get(`http://localhost:5000/api/tasks/${id}`, { headers: { Authorization: token } })
                .then(res => {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setStatus(res.data.status);
                })
                .catch(() => toast.error("Failed to load task details"));
        }
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return toast.warning("Title is required!");

        try {
            if (id) {
                // Update task
                await axios.put(`http://localhost:5000/api/tasks/${id}`, { title, description, status }, { headers: { Authorization: token } });
                toast.success("Task updated successfully!");
            } else {
                // Create task
                await axios.post("http://localhost:5000/api/tasks", { title, description, status }, { headers: { Authorization: token } });
                toast.success("Task added successfully!");
            }

            navigate("/tasks");
        } catch (error) {
            toast.error("Error saving task!");
        }
    };

    return (
        <Box p={3} boxShadow={3} borderRadius={2} maxWidth="500px" margin="auto" bgcolor="#f9f9f9">
            <Typography variant="h6" gutterBottom>{id ? "Edit Task" : "Add Task"}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required margin="normal" />
                <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" multiline rows={3} />
                <TextField fullWidth select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} margin="normal">
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth>{id ? "Update Task" : "Add Task"}</Button>
            </form>
        </Box>
    );
}

export default TaskForm;
