import React, {     
        createContext, 
        useContext,
        useEffect
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

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
    signInWithGoogle: () => Promise<void>;
    signInWithApple: () => Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = React.useState<User>({} as User);
    const userStorageKey = "@gofinances:user";
    const [userStorageLoad, setUserStorageLoad] = React.useState(true);

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");
            
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
            
            if (type === "success") {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                const userLoggedIn = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                }
                setUser(userLoggedIn);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signInWithApple(){
        try {
            const credentials = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            if (credentials) {
                const userLoggedIn = {
                    id: credentials.user,
                    email: credentials.email,
                    name: credentials.fullName!.givenName!,
                    photo: undefined
                }
                setUser(userLoggedIn);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
            }
        } catch (error) {
            throw new Error(error);
        }    
    
    }

    useEffect( () => {
        async function loadUserStoredData() {
            const userStorage = await AsyncStorage.getItem(userStorageKey);
            if (userStorage) {
                const userLogged = JSON.parse(userStorage) as User;
                setUser(userLogged);
            }
            setUserStorageLoad(false);
        }
        loadUserStoredData();
    }, []);

    return (
        <AuthContext.Provider value={{user, signInWithGoogle, signInWithApple}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };