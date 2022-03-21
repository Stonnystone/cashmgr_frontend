import React, { useState } from "react";

// Router redirection
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

// Redux action
import { activate } from "../../store/actions/auth"

const ActivationApp = ({ match, activate }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const uid = match.params.uid;
    const token = match.params.token;

    const res = await activate(uid, token);

    if (res === 204) {
      setRequestSent(true);
    }
  };

  if (requestSent) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="d-flex align-items-center vh-100 py-3">
        <Container className="h-100">
          <Row className="align-items-center justify-content-center h-100">
            <Col lg={5}>
              <Card>
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <h3 className="text-dark mb-3">Activate your account</h3>
                  </div>
                  <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="text-center">
                      {!spinner ? (
                        <Button type="submit" variant="primary" value="Login">
                          Activate
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
                          Activating...
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

// Connect react component with redux store
export const Activation = connect(null, { activate })(ActivationApp);
