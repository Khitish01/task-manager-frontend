import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Box, Typography } from "@mui/material";

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
                <Typography variant="h5" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required margin="normal" />
                    <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required margin="normal" />
                    <Button variant="contained" color="primary" fullWidth type="submit">Login</Button>
                </form>
            </Box>
        </Container>
    );
}

export default Login;
