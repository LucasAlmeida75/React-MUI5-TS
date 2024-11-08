import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";
import { SettingsAccessibility } from "@mui/icons-material";

interface IAuthContextData {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>;
    logout: () => void;
}

interface IAuthProviderProps {
    children?: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string>();

    const LOCAL_STORAGE_ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

        if (accessToken)
            setAccessToken(JSON.parse(accessToken));
        else
            setAccessToken(undefined);
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);
        if (result instanceof Error) {
            return result.message;
        }
        setAccessToken(result.accessToken);
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, JSON.stringify(result.accessToken));
    }, []);

    const handleLogout = useCallback(() => {
        setAccessToken(undefined);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    }, []);

    const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);