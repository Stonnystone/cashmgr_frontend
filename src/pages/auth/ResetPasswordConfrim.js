import React, { useState } from "react";

// Router
import { Redirect } from "react-router-dom";

// redux connect with react
import { connect } from "react-redux";

// Bootstrap
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { toast } from "react-toastify";

// Redux action
import { reset_password_confirm } from "../../store/actions/auth"

const ResetPasswordConfrimApp = ({ match, reset_password_confirm }) => {
  const [formData, setformData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [requestSent, setRequestSent] = useState(false);
  const { new_password, re_new_password } = formData;

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    if (new_password === re_new_password) {
      const res = await reset_password_confirm(
        uid,
        token,
        new_password,
        re_new_password
      );

      if (res) {
        toast.dark("Password has been reset successfully", {
          autoClose: 4000,
        });
        setRequestSent(true);
      } else {
        toast.dark("Password reset link can used only one time.", {
          autoClose: 4000,
        });
      }
    } else {
      toast.error("Password don't match", { autoClose: 4000 });
    }
  };

  if (requestSent) {
    return <Redirect to="/login" />;
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
                    <h3 className="text-dark mb-3">Reset your password</h3>
                  </div>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="#password">New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="new_password"
                        id="new_password"
                        placeholder="Enter new password"
                        value={new_password || ""}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="#re_password">
                        Re-Enter New password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="re_new_password"
                        id="re_new_password"
                        placeholder="Re-Enter new password"
                        value={re_new_password || ""}
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3 text-center">
                      <Button type="submit" variant="primary">
                        Reset Password
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
export const ResetPasswordConfrim = connect(null, { reset_password_confirm })(
  ResetPasswordConfrimApp
);
