import React, { useState } from "react";

// redux connect with react
import { connect } from "react-redux";

// Bootstrap
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { toast } from "react-toastify";

// Redux action
import { reset_password } from "../../store/actions/auth"

const ResetPasswordApp = ({ reset_password }) => {
  const [formData, setformData] = useState({
    email: "",
  });

  const { email } = formData;

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await reset_password(email);
    if (res) {
      toast.dark("Check your email inbox for reset link", {
        autoClose: 4000,
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center min-vh-100 py-3">
        <Container>
          <Row className="justify-content-center">
            <Col lg={5}>
              <Card>
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <h3 className="text-dark mb-3">Password reset link</h3>
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
                    <Form.Group className="mt-3 mb-3 text-center">
                      <Button type="submit" variant="primary">
                        Send Link
                      </Button>
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


// Connect react component with redux store
export const Resetpassword = connect(null, { reset_password })(
  ResetPasswordApp
);
