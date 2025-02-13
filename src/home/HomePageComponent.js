import React from "react";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/AuthContextProvider";
import {BooksApi} from "./BooksApi";
import {Navigate} from "react-router";
import {BooksList} from "./BooksList";
import {handleNotification} from "../utils/NotificationToast";

import NavBarComponent from "nav/NavBarComponent";

export const HomePageComponent = () => {
    const {auth, logout, notificationMessage, newNotification, setNewNotification, newBook} = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            BooksApi.GetAllBooksApi(auth)
                .catch((err) => {
                    console.log(err)
                    if (err.response) {
                        if (err.response.status === 401 || err.response.status === 403) {
                            logout();
                        }
                    }
                })
                .then((res) => {
                    if (res) {
                        if (res.status === 200) {
                            if (res.data != null) {
                                setBooks(res.data);
                            }
                        }
                    }
                    setLoading(false);
                });
        }
    }, [books, loading])

    useEffect(() => {
        if (newNotification) {
            let bookWithSameId = books.find(b => b.bookId === newBook.bookId);
            if (bookWithSameId == null) {
                setBooks([...books, newBook]);
                handleNotification(notificationMessage);
            }
            setNewNotification(false);
        }
    }, [newNotification])

    if (auth == null) {
        return <Navigate to={"/login"} />
    }

    return (
        <div>
            <NavBarComponent name={auth.firstName + " " + auth.lastName} logout={logout}/>
            <div className="container homePageMainContent">
                <BooksList books={books}/>
            </div>
        </div>
    )
}