import React, { useState } from "react";

// Router
import { Redirect } from "react-router-dom";

// redux connect with react
import { connect } from "react-redux";

// Bootstrap
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import { toast } from "react-toastify";

// Redux action
import { signup } from "../../store/actions/auth"

const SignupApp = ({ signup, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: "",
    name: "",
    password: "",
    re_password: "",
  });
  const [requestSent, setRequestSent] = useState(false);

  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const { email, name, password, re_password } = formData;

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === re_password) {
      setRequestSent(true);
      // send state to redux
      const log = await signup(email, name, password, re_password);

      if (log.status === 201) {
        const message =
          "Activation link sent to email. You can login to your after activation";

        setEmailError("");
        setPasswordError("");
        setRequestSent(false);
        toast.success(message, {
          hideProgressBar: true,
          autoClose: 5000,
        });
      } else {
        setRequestSent(false);
        const response_data = log.data;

        for (let data in response_data) {
          setEmailError(data === "email" ? response_data[data][0] : null);
          setPasswordError(data === "password" ? response_data[data] : null);
        }
      }
    } else {
      toast.error("Password doesn't match, Try another password");
    }
  };

  // user IsAuthenticated
  // Redirect to homepage

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="d-flex align-items-center min-vh-100 py-3">
        <Container>
          <Row className="justify-content-center">
            <Col lg={5}>
              <Card>
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <h3 className="text-dark mb-3">Login</h3>
                    <p className="text-muted mb-4">
                      Enter your credentials to access admin panel
                    </p>
                  </div>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="#email">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        value={email || ""}
                        onChange={(e) => handleChange(e)}
                        required
                        isInvalid={!!emailError}
                      />
                      <Form.Control.Feedback type="invalid">
                        {emailError ? emailError : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="#name">Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Username"
                        value={name || ""}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="#password">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        value={password || ""}
                        onChange={(e) => handleChange(e)}
                        minLength="8"
                        isInvalid={!!passwordError}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {passwordError ? passwordError : ""}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="#re_password">
                        Re-enter Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="re_password"
                        id="re_password"
                        placeholder="Re-Enter Password"
                        value={re_password || ""}
                        onChange={(e) => handleChange(e)}
                        minLength="8"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3 text-center">
                      {!requestSent ? (
                        <Button type="submit" variant="primary" value="Login">
                          Register
                        </Button>
                      ) : (
                        <Button variant="primary" disabled>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          {"  "}
                          Send Request...
                        </Button>
                      )}
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

// Get Data from redux store
const mapStateToProps = (state) => ({
  // Check Authentictaion
  isAuthenticated: state.auth.isAuthenticated,
});

// Connect react component with redux store
export const Signup = connect(mapStateToProps, { signup })(SignupApp);
