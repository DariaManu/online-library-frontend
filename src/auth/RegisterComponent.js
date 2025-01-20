import {useContext} from "react";
import {AuthContext} from "./AuthContextProvider";
import {Navigate, NavLink, useNavigate} from "react-router";
import {Card, CardBody, Form, Row, Col} from "react-bootstrap";
import {Formik, Form as FormFormik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {AuthenticationApi} from "./AuthenticationApi";
import {handleError} from "../utils/ErrorToast";
import {handleSuccess} from "../utils/SuccessToast";

const validationSchema = () =>
    Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().min(5).required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

export const RegisterComponent = () => {
    const {auth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const userProfile = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const handleClickOnSubmitButton = async (values) => {
        await AuthenticationApi.RegisterApi(values)
            .catch((err) => {
                handleError("Email already used!");
                if (err.response) {
                    if (err.response.status === 400 || err.response.status === 403) {
                        logout();
                    }
                }
            })
            .then((r) => {
                if (r) {
                    if (r.status === 200) {
                        handleSuccess("Register successful");
                        navigate("/login");
                    }
                }
            })
    }

    if (auth) {
        return <Navigate to="/home"/>
    }

    return (
        <div className="container d-flex flex-column justify-content-center text-center authForm w-50">
            <h2 className="mb-4">
                <b>
                    Register as <span className="text-primary">User</span>
                </b>
            </h2>

            <div className="d-flex">
                <Card className="container">
                    <CardBody className="formBody">
                        <Formik
                            initialValues={userProfile}
                            onSubmit={handleClickOnSubmitButton}
                            validationSchema={validationSchema}
                        >
                            <FormFormik className="d-flex flex-column">
                                <Field id="firstName" name="firstName">
                                    {({ field }) => (
                                        <div className="formRow">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" {...field} />
                                            <span className="error">
                                                <ErrorMessage name="firstName" />
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Field id="lastName" name="lastName">
                                    {({ field }) => (
                                        <div className="formRow">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" {...field} />
                                            <span className="error">
                                                <ErrorMessage name="lastName" />
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Field id="email" name="email">
                                    {({ field }) => (
                                        <div className="formRow">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="text" {...field} />
                                            <span className="error">
                                                <ErrorMessage name="email" />
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Field id="password" name="password">
                                    {({ field }) => (
                                        <div className="formRow">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" {...field} />
                                            <span className="error">
                                                <ErrorMessage name="password" />
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Field id="confirmPassword" name="confirmPassword">
                                    {({ field }) => (
                                        <div className="formRow">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" {...field} />
                                            <span className="error">
                                                <ErrorMessage name="confirmPassword" />
                                            </span>
                                        </div>
                                    )}
                                </Field>

                                <Row className="formRow">
                                    <Col className="col-md-4 mx-auto">
                                        <Form.Control
                                            id="registerUserSubmit"
                                            type="submit"
                                            value="Register"
                                            className="btn btn-primary"
                                        />
                                    </Col>
                                </Row>
                            </FormFormik>
                        </Formik>
                        <div className="mb-5">
                            <div className="mx-auto text-center">
                                Already have an account?&nbsp;
                                <NavLink className="text-primary" to={"/login"}>
                                    Login
                                </NavLink>
                                .
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}