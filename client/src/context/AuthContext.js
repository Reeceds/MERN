import { React } from "react";
import { useContext, useState, createContext } from "react";

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);

    function toggleAuth(authState) {
        setAuth(authState);
    }

    return (
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={toggleAuth}>{children}</AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
}
