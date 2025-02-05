import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
    List, ListItem, ListItemText, IconButton, MenuItem, Select, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function TaskList({ tasks, setTasks }) {
    const { token } = useContext(AuthContext);
    const [open, setOpen] = useState(false); // Controls the modal
    const [selectedTask, setSelectedTask] = useState(null); // Stores task to delete

    // Handle status update
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/tasks/${id}`,
                { status: newStatus },
                { headers: { Authorization: token } }
            );
            setTasks(tasks.map(task => (task._id === id ? res.data : task)));
            toast.success("Task status updated!");
        } catch (error) {
            toast.error("Error updating task status!");
        }
    };

    // Open confirmation dialog
    const handleOpenDialog = (task) => {
        setSelectedTask(task);
        setOpen(true);
    };

    // Close confirmation dialog
    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedTask(null);
    };

    // Delete task after confirmation
    const handleDelete = async () => {
        if (!selectedTask) return;
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${selectedTask._id}`, {
                headers: { Authorization: token },
            });
            setTasks(tasks.filter(task => task._id !== selectedTask._id));
            toast.success("Task deleted successfully!");
        } catch (error) {
            toast.error("Error deleting task!");
        }
        handleCloseDialog();
    };

    return (
        <Box boxShadow={3} p={3} borderRadius={2} bgcolor="#fff">
            <Typography variant="h6" gutterBottom>Your Tasks</Typography>
            {tasks.length === 0 ? (
                <Typography color="textSecondary">No tasks available.</Typography>
            ) : (
                <List>
                    {tasks.map(task => (
                        <ListItem key={task._id} divider>
                            <ListItemText primary={task.title} secondary={task.description} />
                            
                            {/* Status Dropdown */}
                            <Select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                size="small"
                                sx={{ minWidth: 120, marginRight: 2 }}
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>

                            <IconButton component={Link} to={`/task-form/${task._id}`} color="primary">
                                <EditIcon />
                            </IconButton>
                            {/* Delete Button with Confirmation */}
                            <IconButton onClick={() => handleOpenDialog(task)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default TaskList;
