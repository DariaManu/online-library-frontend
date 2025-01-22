import axios from "axios";

export class AuthenticationApi {
    static LoginApi({email, password}) {
        //console.log("http://localhost:9090/account/login");
        return axios.post("http://localhost:9090/account/login", {
            email,
            password
        });
    };

    static RegisterApi({firstName, lastName, email, password}) {
        //console.log(firstName);
        //console.log(lastName);
        //console.log(email);
        //console.log(password);
        //console.log("http://localhost:9090/account/register/user");
        return axios.post( "http://localhost:9090/account/register/user", {
            firstName,
            lastName,
            email,
            password
        });
    };
}