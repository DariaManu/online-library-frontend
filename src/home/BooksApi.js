import React from "react";
import axios from "axios";
import {ApiUtils} from "../utils/ApiUtils";

export class BooksApi {
    static GetAllBooksApi(auth) {
        return axios.get("http://localhost:9090/books", ApiUtils.getAuthorizationHeader(auth));
    };

    static GetBookCoverImage({bookId, auth}) {
        //console.log(bookId);
        //console.log("http://localhost:9090/books/" + bookId + "/coverImage");
        return axios.get("http://localhost:9090/books/" + bookId + "/coverImage", ApiUtils.getHttpConfigForBlob(auth));
    }

    static GetBookResource({bookId, auth}) {
        //console.log("http://localhost:9090/books/" + bookId +"/resource");
        return axios.get("http://localhost:9090/books/" + bookId +"/resource", ApiUtils.getHttpConfigForBlob(auth));
    }
}