import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
    const { token, logout } = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Task Manager</Typography>
                {token ? (
                    <Button color="inherit" onClick={logout}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
