import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../config/Api";

const [local] = axios;

const AuthContext = createContext();

export function useAuth () {
    const context = useContext(AuthContext);
    return context;
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            setAuthenticated(true);
            localStorage.setItem("token", token);
        }else {
            setAuthenticated(false);
            localStorage.removeItem("token");
        }
    },[token]);

    const login = async (email, password) => {
        try {
            const response = await local.post("/login", { email, password });
            setToken(response.data.access_token);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const logout = () => {
        setToken(null);
    };

    return(
        <AuthContext.Provider value={{ authenticated, token, login, logout,
            onAuthenticated: (auth, token) => {
                setAuthenticated(auth);
                if (auth && token) {
                    localStorage.setItem('token', token);
                } else{
                    localStorage.removeItem('token');
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}