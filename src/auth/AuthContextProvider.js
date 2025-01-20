import {createContext, useEffect, useState} from "react";
import {AuthenticationApi} from "./AuthenticationApi";

import { Buffer } from "buffer";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        const authFromLocalStorage = localStorage.getItem("auth");
        if (authFromLocalStorage) {
            return JSON.parse(authFromLocalStorage);
        }
        return null;
    });

    const login = ({ email, password }) => {
        return new Promise((resolve, reject) => {
            AuthenticationApi.LoginApi({ email: email, password: password })
                .catch((err) => {
                    reject(err);
                })
                .then((response) => {
                    if (response && response.status === 200) {
                        const auth = {
                            id: response.data.id,
                            role: response.data.role,
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            token: "Basic " + Buffer.from(email + ":" + password, "utf8").toString("base64")
                        };
                        localStorage.setItem("auth", JSON.stringify(auth));
                        setAuth(auth);
                        resolve();
                    }
                });
        });
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    };

    useEffect(() => {
        window.addEventListener("storage", () => {
            if (auth && !localStorage.getItem("auth")) {
                setAuth(null);
            }
        });
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem("auth", JSON.stringify(auth));
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}