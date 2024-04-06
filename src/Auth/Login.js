import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "../globle";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

const formValidationSchema = yup.object({
  email: yup.string().min(8, "Need a longer email").required("Why not fill this email?"),
  password: yup.string().min(4, "Need a longer Password").required("Why not fill this password?"),
});

function Login() {
  const [formState, setFormState] = useState("success");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const data = await fetch(`${API}/users/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json" },
      });
      setLoading(false);
      if (data.status === 401) {
        console.log("ERROR");
        setFormState("error");
      } else {
        const result = await data.json();
        window.localStorage.setItem("token", result.token);
        window.localStorage.setItem("email", result.email);
        navigate("/dashboard/home");
      }
    },
  });

  return (
    <Container >
      <Row className="align-items-stretch  justify-content-center">
        <Col md={7} className="p-0">
          <Card className="h-100 ">
            <Card.Body className="d-flex align-items-center justify-content-center flex-direction-column">
              <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSubmit}>
                <h2 className="text-center text-danger" >
                  Login
                </h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Text className="text-muted">
                    Welcome Back! Please Enter your Details
                  </Form.Text><br />
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><MailIcon /></InputGroup.Text>
                    <Form.Control
                      value={values.email}
                      type="email"
                      placeholder="Enter your Email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email}
                    />
                  </InputGroup>
                  <p style={{ color: "red" }}>
                    {touched.email && errors.email ? errors.email : null}
                  </p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><LockIcon /></InputGroup.Text>
                    <Form.Control
                      value={values.password}
                      type="password"
                      placeholder="Enter your Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}

                    />
                  </InputGroup>
                  <p style={{ color: "red" }}>
                    {touched.password && errors.password ? errors.password : null}
                  </p>
                </Form.Group>
                <p style={{ color: "red" }}>
                  {formState === "error" ? "Invalid Credentials" : null}
                </p>
                <div className="password">
                  <Button
                    variant={formState === "error" ? "danger" : "primary"}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : formState === "error" ? "Retry" : "Login"}
                  </Button>
                  <Link to="/forgotpassword" className="link">
                    Forgot Password
                  </Link>
                </div>
                <div className="py-4">
                  <p className="text-center">
                    Don't have an account ? <Link to="/register"> Signup </Link>
                  </p>
                </div>
                <div>
                  <p className="text-danger">Demo User</p>
                  <p>Email:mounikaadada744@gmail.com</p>
                  <p>Password:Mounika@744</p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className="p-0">
          <Card className="h-100">
            <Card.Body className="login__bg">
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
