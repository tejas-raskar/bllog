import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { SignupInput } from "@traskar/bllog-common";

interface AuthContextType {
    token: string;
    userId: string;
    authenticate: (data: SignupInput, type: "signin" | "signup") => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: '',
    userId: '',
    authenticate: async () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const authenticate = async (payload: SignupInput, type: "signin" | "signup") => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, payload);
            if(res.data) {
                setUserId(res.data.userId);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate('/feed');
                return;
            }
            throw new Error(res.statusText);
        } catch (e) {
            console.error(e);
        }
    };

    const logout = () => {
        setUserId("");
        setToken("");
        localStorage.clear();
        navigate('/signin');
    };

    return <AuthContext.Provider value={{ token, userId, authenticate, logout }}>
        {children}
    </AuthContext.Provider>
}