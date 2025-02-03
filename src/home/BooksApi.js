import React from "react";
import axios from "axios";
import {ApiUtils} from "../utils/ApiUtils";

export class BooksApi {
    static GetAllBooksApi(auth) {
        return axios.get(ApiUtils.getBackendServicesURL() + "/books", ApiUtils.getAuthorizationHeader(auth));
    };

    static GetBookCoverImage({bookId, auth}) {
        return axios.get(ApiUtils.getBackendServicesURL() + "/books/" + bookId + "/coverImage", ApiUtils.getHttpConfigForBlob(auth));
    }

    static GetBookResource({bookId, auth}) {
        return axios.get(ApiUtils.getBackendServicesURL() + "/books/" + bookId +"/resource", ApiUtils.getHttpConfigForBlob(auth));
    }
}