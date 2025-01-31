import React from "react";
import {Col, Row} from "react-bootstrap";
import {BookCard} from "./BookCard";

export const BooksList = (props) => {
    //console.log(props.books);
    const chunkedContent = [];

    if (props.books.length > 0) {
        for (let i = 0; i < props.books.length; i += 3) {
            chunkedContent.push(props.books.slice(i, i + 3));
        }
        //console.log(chunkedContent);
    }

    return (
        <div className="d-flex justify-content-center">
            <div style={{width: "100%"}}>
                {chunkedContent.map((row, rowIndex) => (
                    <Row key={rowIndex} style={{height: "600px", margin:"40px"}}
                    className="d-flex align-items-center">
                        {row.map((book, colIndex) => (
                            <Col  key={colIndex} style={{height: "100%", padding:"10px"}} className="d-flex justify-content-center">
                                <BookCard book={book}/>
                            </Col>
                        ))}
                    </Row>
                ))}
            </div>
        </div>
    )
}