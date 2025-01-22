import {useContext, useEffect, useState} from "react";
import {BooksApi} from "./BooksApi";
import {AuthContext} from "../auth/AuthContextProvider";
import {Button, Card} from "react-bootstrap";
import {handleError} from "../utils/ErrorToast";
import FileSaver from "file-saver"

export const BookCard = (props) => {
    const {auth, logout} = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [bookCoverImage, setBookCoverImage] = useState(null);

    useEffect(() => {
        if (!isLoaded) {
            BooksApi.GetBookCoverImage({bookId: props.book.bookId, auth:auth})
                .catch((err) => {
                    console.log(err);
                    if (err) {
                        if (err.response.status === 401 || err.response.status === 403) {
                            logout()
                        }
                    }
                    setIsLoaded(true);
                })
                .then((res) => {
                    if (res && res.status === 200 && res.data) {
                        const file = new Blob([res.data], {type: res.headers["content-type"]});
                        const fileURL = URL.createObjectURL(file);
                        //console.log(fileURL);
                        setBookCoverImage(fileURL);
                        setIsLoaded(true);
                    }
                })
        }
    })

    const handleClickOnGetBookButton = () => {
        console.log("get book with " + props.book.bookId);
        BooksApi.GetBookResource({bookId: props.book.bookId, auth:auth})
            .catch((err) => {
                console.log(err);
                handleError("Could not download book");
            })
            .then((res) => {
                //console.log(res);
                if (res && res.status === 200 && res.data) {
                    const file = new Blob([res.data], {type: res.headers["content-type"]});
                    FileSaver.saveAs(file, props.book.title);
                }
            })
    }

    return ( (!isLoaded || !bookCoverImage) ? "" :

            <Card style={{width: "370px", height:"100%", padding:"30px"}} className="d-flex flex-column align-items-center">
                <div>
                    <img src={bookCoverImage} width="320px" height="350px" alt="book cover image"/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <b>{props.book.title}</b>
                </div>
                <div style={{marginTop: "10px"}}>
                    <b>{props.book.author}</b>
                </div>
                <div style={{marginTop: "10px"}}>
                    <b>{props.book.genre}</b>
                </div>
                <div style={{marginTop: "20px"}}>
                    <Button className="btn btn-primary bookCardButton" onClick={handleClickOnGetBookButton}>
                        <b>Get Book</b>
                    </Button>
                </div>
            </Card>
    )
}