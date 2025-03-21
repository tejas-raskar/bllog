import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "@traskar/bllog-common";

interface AuthContextType {
    token: string;
    userId: string;
    userName: string;
    authenticate: (data: SignupInput, type: "signin" | "signup") => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: '',
    userId: '',
    userName: '',
    authenticate: async () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState(localStorage.getItem("userID") || '');
    const [userName, setUserName] = useState(localStorage.getItem("userName") || '');
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const authenticate = async (payload: SignupInput, type: "signin" | "signup") => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, payload);
            if(res.data) {
                setUserId(res.data.userId);
                setUserName(res.data.userName);
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userID", res.data.userId);
                localStorage.setItem("userName", res.data.userName);
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
        setUserName("");
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate('/');
    };

    return <AuthContext.Provider value={{ token, userId, userName, authenticate, logout }}>
        {children}
    </AuthContext.Provider>
}