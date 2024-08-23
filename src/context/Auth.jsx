import axios from "axios";
import React, { useState, useContext, useEffect, createContext } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("auth"));
        if (data.success) {
            setAuth({
                ...auth,
                user: data.user,
                token: data.token
            })
        }

        //eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthProvider };
