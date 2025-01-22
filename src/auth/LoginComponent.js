import {useContext, useRef, useState} from "react";
import {AuthContext} from "./AuthContextProvider";
import {Card, CardBody, Col, Form, Row} from "react-bootstrap";
import {Navigate, NavLink} from "react-router";
import {handleError} from "../utils/ErrorToast";

export const LoginComponent = () => {
    const email = useRef("");
    const password = useRef("");
    const {auth, login} = useContext(AuthContext);
    const [emailNotFound, setEmailNotFound] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [emailRequired, setEmailRequired] = useState(false);
    const [passwordRequired, setPasswordRequired] = useState(false);

    const handleClickOnSubmitButton = async (e) => {
        e.preventDefault();
        let loginFailed = false;
        //console.log(email.current.value);
        //console.log(password.current.value);
        if (!email.current.value || !password.current.value) {
            e.preventDefault();
            e.stopPropagation();
            !email.current.value && setEmailRequired(true);
            !password.current.value && setPasswordRequired(true);
            return;
        } else {
            setEmailRequired(false);
            setPasswordRequired(false);
        }

        await login({
            email: email.current.value,
            password: password.current.value
        })
            .catch((err) =>{
                loginFailed = true;
                if (err) {
                    handleError("Incorrect email or password!");
                    if (err.response) {
                        if (err.response.status === 404) {
                            setEmailNotFound(true);
                            setInvalidPassword(false);
                        } else if (err.response.status === 401) {
                            setInvalidPassword(true);
                            setEmailNotFound(false);
                        }
                    }
                }
            })
            .then(() => {
                if (!loginFailed) {
                    return <Navigate to={"/home"}/>
                }
            })
    }

    if (auth) {
        return <Navigate to={"/home"}/>
    }

    return (
        <div className="container d-flex flex-column justify-content-center text-center authForm w-50">
            <h2 className="mb-4">
                <b>Login</b>
            </h2>

            <div className="d-flex">
                <Card className="container">
                    <CardBody className="formBody">
                        <Form>
                            <Row className="formRow">
                                <Col>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="emailInput"
                                        ref={email}
                                        required
                                    />
                                    {emailNotFound && (
                                        <p className="error">Email not found</p>
                                    )}
                                    {emailRequired && (
                                        <span className="error">Email is required</span>
                                    )}
                                </Col>
                            </Row>
                            <Row className="formRow">
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="passwordInput"
                                        ref={password}
                                        required
                                    />
                                    {invalidPassword && (
                                        <p className="error">Invalid password</p>
                                    )}
                                    {passwordRequired && (
                                        <span className="error">Password is required</span>
                                    )}
                                </Col>
                            </Row>
                            <Row className="formRow">
                                <Col>
                                    <Form.Control
                                        id="loginSubmit"
                                        type="submit"
                                        value="Log In"
                                        className="btn btn-primary"
                                        onClick={handleClickOnSubmitButton}
                                    />
                                </Col>
                            </Row>
                            <Row className="formRow">
                                <Col className="mx-auto text-center">
                                    Don't have an account? Register&nbsp;
                                    <NavLink className="text-primary" to={"/register"}>
                                        here
                                    </NavLink>
                                    .
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}