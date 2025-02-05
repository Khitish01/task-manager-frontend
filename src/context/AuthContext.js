import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            toast.success("Login successful!");
            navigate("/tasks");
        } catch (error) {
            toast.error("Login failed! Please check your credentials.");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        toast.info("You have logged out.");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
