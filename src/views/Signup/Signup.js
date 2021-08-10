import React, {useEffect, useState} from "react";
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
import "./Signup.css";
import LoadingBar from "../../components/Loading/Loading";
import { Formik, Field, Form } from 'formik';
import {RoutesString} from "../../pages/routesString";
import * as Yup from 'yup';
import roleApi from "../../api/roleApi";
import userApi from "../../api/userApi";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username too Short!')
        .max(20, 'Username tooo Long!')
        .required('Username required'),
    password: Yup.string()
        .min(3, 'Password too Short!')
        .max(20, 'Password too Long!')
        .required('Password required'),
    retypePassword: Yup.string()
        .min(3, 'Password too Short!')
        .max(20, 'Password too Long!')
        .required('Password required')
});

export default function Signup(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [ roles, setRoles ] = useState([{id: 0, name: "FRESHER"}])

    const fetchRoles = async () => {
        try{
            const data = await roleApi.getAll();
            setRoles(data?.map(item=> ({id: item.id, name: item.name})));
        }catch(e){
            alert(e);
        }
    }

    useEffect(()=>{
        fetchRoles();
    },[])

    const initialValues = {
        username: "",
        password: "",
        retypePassword: "",
        role: "FRESHER"
    }
    const handleValidSubmit = async ( user ) => {
        setStatus("");
        setIsLoading(true);
        try {
            if(user.password === user.retypePassword) {
                await userApi.signup({username: user.username, password: user.password, role: user.role});
                alert("Success! Please login");
            } else{
                setStatus("Password and Re-enter password not match")
            }
            setIsLoading(false);
        } catch (err) {
            alert(err);
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
                                <h4>SIGN UP</h4>
                                <hr />
                                <Formik initialValues={initialValues}
                                        onSubmit={(values) => {
                                            handleValidSubmit(values);
                                        }}
                                        validationSchema={SignupSchema}
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
                                            <FormGroup className="mt-4 mb-4">
                                                <Field
                                                    as={Input}
                                                    className="my-custom-input"
                                                    type="password"
                                                    name="retypePassword"
                                                    id="RetypePassword"
                                                    placeholder="Re-enter Password"
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Field
                                                    as={Input}
                                                    type="select"
                                                    name="role"
                                                    onChange={(e) =>{
                                                        handleChange(e);
                                                    }}
                                                >
                                                    {roles.map((role, index)=><option value={role.name}>{role.name}</option>)}
                                                </Field>
                                            </FormGroup>
                                            <FormText color="danger">{status} {errors.username!==undefined && `. ${errors.username}`} {errors.password!==undefined && `. ${errors.password}`}</FormText>
                                            <div className="text-center my-4">
                                                <Button type="submit" className="buttonOrange">Sign up</Button>
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
                                                href={RoutesString.SIGNIN}
                                            >
                                                Sign in
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