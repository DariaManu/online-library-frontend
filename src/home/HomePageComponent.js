import {ApplicationNavBar} from "../utils/ApplicationNavBar";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/AuthContextProvider";
import {BooksApi} from "./BooksApi";
import {Navigate} from "react-router";
import {BooksList} from "./BooksList";
import {handleNotification} from "../utils/NotificationToast";

export const HomePageComponent = () => {
    const {auth, logout, notificationMessage, newNotification, setNewNotification} = useContext(AuthContext);
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
                                //console.log(res.data);
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
            console.log(notificationMessage);
            handleNotification(notificationMessage);
            setNewNotification(false);
        }
    }, [newNotification])

    if (auth == null) {
        return <Navigate to={"/login"} />
    }

    return (
        <div>
            <ApplicationNavBar/>
            <div className="container homePageMainContent">
                <BooksList books={books}/>
            </div>
        </div>
    )
}