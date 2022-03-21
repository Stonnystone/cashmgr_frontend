import React, { useState } from "react";

// Router
import { Redirect, Link } from "react-router-dom";

// redux connect with react
import { connect } from "react-redux";

// Bootstrap
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { toast } from "react-toastify";

// Redux action
import { login } from "../../store/actions/auth";

const LoginApp = ({ login, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // send state to redux
    const log = await login(email, password);

    if (log.status === 200) {
      const message = `Login Success`;

      toast.success(message, {
        hideProgressBar: true,
        autoClose: 4000,
      });
    } else {
      const message = `${log.status} ${log.statusText}, ${log.data.detail}`;

      toast.error(message, {
        hideProgressBar: true,
        autoClose: 4000,
      });
    }
  };

  // user IsAuthenticated
  // Redirect to homepage

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {/* <Cube time={2000} /> */}
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
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Link
                        to="/reset-password"
                        className="text-muted float-end "
                      >
                        <small>Forgot your password?</small>
                      </Link>
                      <Form.Label htmlFor="#password">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Password"
                        value={password || ""}
                        onChange={(e) => handleChange(e)}
                        minLength="8"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3 text-center">
                      <Button type="submit" variant="primary" value="Login">
                        Login
                      </Button>
                    </Form.Group>
                  </Form>
                  <div className="text-center mt-5">
                    <p className="text-muted">
                      Not registered?{" "}
                      <Link to="/signup">Create an account</Link>
                    </p>
                  </div>
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
export const LoginPage = connect(mapStateToProps, { login })(LoginApp);
