import React, { useState, Fragment } from "react";
import {
    Card,
    Row,
    Col,
    Container,
    Jumbotron,
    FormText,
    FormGroup,
    Button,
    Input,
} from "reactstrap";
import "./Signin.css";
import AuthenticationService from "../../services/Authentication_service";
import LoadingBar from "../../components/Loading/Loading";
import { Formik, Field, Form } from 'formik';
import {RoutesString} from "../../pages/routesString";
import * as Yup from 'yup';
import { useHistory } from "react-router";

const SigninSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username too Short!')
        .max(20, 'Username tooo Long!')
        .required('Username required'),
    password: Yup.string()
        .min(3, 'Password too Short!')
        .max(20, 'Password too Long!')
        .required('Password required')
});

export default function Signin(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const history = useHistory();

    if (AuthenticationService.currentUserValue) {
        history.push("/");
    }

    const initialValues = {
        username: "",
        password: ""
    }
    const handleValidSubmit = async ( user ) => {
        // if(!validatePassword(String(user?.password))){
        //     setStatus("Password must contain 8 characters, 1 number and 1 UPPERCASE");
        //     return;
        // }
        setIsLoading(true);
        try {
            const response = await AuthenticationService.signin(user);
            if (response.token) {
                const { from } = props.location.state || { from: { pathname: "/" } };
                history.push(from);
            } else {
                if(response?.message === 'ACCOUNT_NOT_VERIFY'){
                    setStatus("ACCOUNT_NOT_VERIFY");
                }else{
                    setStatus("RESPONSE_500");
                }
                setIsLoading(false);
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403 || err.response.status === 401) {
                    AuthenticationService.signout();
                } else {
                    setStatus("Wrong user name or password");
                }
            }
            setIsLoading(false);
        }
    };
    return (
        <>
            {isLoading && <LoadingBar />}
            <Container>
                <Row>
                    <Col xs="12" sm="12" md="7" lg="7">
                        <div className="titleHead">
                            <h2>{("Some header").toUpperCase()}</h2>
                        </div>
                    </Col>
                    <Col xs="12" sm="12" md="5" lg="5">
                        <Jumbotron className="box">
                            <Card className="cardD shadow">
                                <h4>SIGN IN</h4>
                                <hr />
                                    <Formik initialValues={initialValues}
                                            onSubmit={(values) => {
                                                handleValidSubmit(values);
                                            }}
                                            validationSchema={SigninSchema}
                                    >
                                        {({ errors, handleChange }) => (
                                            <Form>
                                                <FormGroup className="mt-5">
                                                    <Field
                                                        as={Input}
                                                        className="my-custom-input"
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        placeholder="Username"
                                                        onChange={(e) =>
                                                            handleChange(e)
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup className="mt-4 mb-4">
                                                    <Field
                                                        as={Input}
                                                        className="my-custom-input"
                                                        type="password"
                                                        name="password"
                                                        id="Password"
                                                        placeholder="Password"
                                                        onChange={(e) =>
                                                            handleChange(e)
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormText color="danger">{status} {errors.username!==undefined && `. ${errors.username}`} {errors.password!==undefined && `. ${errors.password}`}</FormText>
                                                <div className="text-center my-4">
                                                    <Button type="submit" className="buttonOrange">Sign in</Button>
                                                </div>
                                            </Form>
                                        ) }
                                    </Formik>
                                <hr />
                                <Container className="mb-2">
                                    <div className="form_signin_footer">
                                        <div className="btn_ text-center">
                                            <a
                                                type="button"
                                                className="register_btn text-warning"
                                            >
                                                Forgot password
                                            </a>
                                        </div>
                                        <div className="btn_ text-center">
                                            <a
                                                className="text-warning register_btn"
                                                href={RoutesString.SIGNUP}
                                            >
                                                Sign up
                                            </a>
                                        </div>
                                    </div>
                                </Container>
                            </Card>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </>
    );
}