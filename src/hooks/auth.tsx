import React, {     
        createContext, 
        useContext
} from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const user = {
        id: "1",
        name: "Fulano",
        email: "aa@abc.com"
    };
    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };