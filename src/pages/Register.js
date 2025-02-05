import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
                <Typography variant="h5" gutterBottom>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required margin="normal" />
                    <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required margin="normal" />
                    <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required margin="normal" />
                    <Button variant="contained" color="primary" fullWidth type="submit">Register</Button>
                </form>
            </Box>
        </Container>
    );
}

export default Register;
