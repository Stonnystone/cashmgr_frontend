import React from "react";

// Router redirection
import { Redirect } from "react-router-dom";

// redux connect with react
import { connect } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";

const HomepageApp = ({ isAuthenticated }) => {

  // const capFirstLetter = (text) =>{
  //   return text.
  // }

  return (
    <>
      {isAuthenticated ? (
        <Container>
          <Row>
            <Col xl={12}>
              <div className="mt-5 p-5 bg-dark">
                <div className="text-white">
                  <h1>Cash Management App</h1>
                  <p className="">
                    The Application uses a Django rest framework JWT with React frontend
                  </p>
                  <ul>
                    <li>Authentication users.</li>
                    <li>Adds user bank accounts to the system</li>
                    <li>connects accounts to user bank via mono API</li>
                    <li>Displays user bank transaction history</li>
                  </ul>
                </div>
                <hr className="my-4 text-dark" />
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

// Get Data from redux store
const mapToStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Connect react component with redux store
export const Homepage = connect(mapToStateProps)(HomepageApp);
