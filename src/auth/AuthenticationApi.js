import React from "react";
import axios from "axios";
import {ApiUtils} from "../utils/ApiUtils";

export class AuthenticationApi {
    static LoginApi({email, password}) {
        return axios.post(ApiUtils.getBackendServicesURL() + "/account/login", {
            email,
            password
        });
    };

    static RegisterApi({firstName, lastName, email, password}) {
        return axios.post( ApiUtils.getBackendServicesURL() + "/account/register/user", {
            firstName,
            lastName,
            email,
            password
        });
    };
}