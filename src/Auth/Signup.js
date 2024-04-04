import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../globle"
import MailIcon from '@mui/icons-material/Mail';
import Person3Icon from '@mui/icons-material/Person3';
import LockIcon from '@mui/icons-material/Lock';

const formValidationSchema = yup.object({
  email: yup
    .string()
    .min(8, "Need a longer email")
    .required("Email is required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  username: yup
    .string()
    .required("Username is required"),

  password: yup
    .string()
    .min(4, "Need a longer Password")
    .required("Password is required"),
});

function Signup() {

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: formValidationSchema,

    onSubmit: (values) => {

      register(values)
    },
  });
  const navigate = useNavigate();

  const register = (newUser) => {

    fetch(`${API}/users/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate("/"));

  };

  return (

    <Container>
      <Row className="align-items-stretch  justify-content-center">

        <Col md={7} className="p-0">
          <Card className="h-100 ">
            <Card.Body className="d-flex align-items-center justify-content-center flex-direction-column">

              <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSubmit}>
                <h1 className="text-center">Create An Account</h1>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>UserName</Form.Label>
                  <InputGroup>

                    <InputGroup.Text><Person3Icon /></InputGroup.Text>
                    <Form.Control
                      value={values.username}
                      type="text"
                      placeholder="Enter your Username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && errors.username}
                    />
                  </InputGroup>
                  <p style={{ color: "red" }}>{touched.username && errors.username ? errors.username : null} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup>

                    <InputGroup.Text><MailIcon /></InputGroup.Text>
                    <Form.Control
                      value={values.email}
                      type="email"
                      placeholder="Enter your Email Id"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                  </InputGroup>
                  <p style={{ color: "red" }}>{touched.email && errors.email ? errors.email : null}</p>

                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>

                    <InputGroup.Text><LockIcon /></InputGroup.Text>
                    <Form.Control
                      value={values.password}
                      type="text"
                      placeholder="Enter your Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                    />
                  </InputGroup>
                  <p style={{ color: "red" }}>{touched.password && errors.password ? errors.password : null}</p>

                </Form.Group>

                <Button variant="primary" type="submit">
                  Create account
                </Button>
                <div className="py-4">
                  <p className="text-center">
                    Already have an account ? <Link to="/login"> Login </Link>
                  </p>

                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className="p-0">
          <Card className="h-100">
            <Card.Body className="signup__bg">
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  )
}

export default Signup