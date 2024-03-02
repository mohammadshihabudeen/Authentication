import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem("token",token)
    }

    function logout() {
        setAuthToken(null);
    }

    const values = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

export default AuthContextProvider;
