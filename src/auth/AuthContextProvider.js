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
    const [webSocket, setWebSocket] = useState(null);
    const [newNotification, setNewNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [newBook, setNewBook] = useState(null);

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
                        connectToWebSocket();
                        resolve();
                    }
                });
        });
    };

    const connectToWebSocket = () => {
        const ws = new WebSocket("ws://localhost:9095/webSocket");
        ws.onopen = () => {
            console.log("WebSocket connection established");
        }
        ws.onclose = () => {
            console.log("WebSocket connection closed");
        }
        ws.onerror = (error) => {
            console.log("WebSocket error: " + error);
        }
        ws.onmessage = (event) => {
            console.log(event);
            if (event && event.data) {
                console.log(`Received message: ${event.data}`);
                let notification = JSON.parse(event.data);
                setNotificationMessage(notification.eventMessage);
                let nb = {
                    bookId: notification.bookId,
                    title: notification.title,
                    author: notification.author,
                    genre: notification.genre
                }
                setNewBook(nb);
                setNewNotification(true);
            }
        }
        setWebSocket(ws)
    }

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
        webSocket.onclose();
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
            /*if (webSocket) {
                webSocket.onopen();
            } else {
                connectToWebSocket();
            }*/
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth, notificationMessage, newNotification, setNewNotification, newBook, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}