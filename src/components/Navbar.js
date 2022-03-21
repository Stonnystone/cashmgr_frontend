import React from "react";

import { Nav, Navbar, Dropdown, Container } from "react-bootstrap";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { logout } from "../store/actions/auth"

export const HeaderApp = ({ logout, isAuthenticated, user }) => {
  const admin = user !== null ? user.is_superuser : false;

  const logout_user = () => {
    logout();
  };

  const firstLetterCaps = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const AuthLinks = () => {
    return (
      <>
        {admin ? (
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
        ) : null}
        <Nav.Link as={Link} to="/accounts">Accounts</Nav.Link>
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            as={Nav.Link}
            data-toggle="dropdown"
            className="m-0"
          >
            Transactions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/transactions">
              All
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/inflows">
              Inflows
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/outflows">
              Outflows
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            as={Nav.Link}
            data-toggle="dropdown"
            className="m-0"
          >
            {firstLetterCaps(user.name)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/dashboard">
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={logout_user}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const GuestLinks = () => {
    return (
      <>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link>
        <Nav.Link as={Link} to="/signup">
          Signup
        </Nav.Link>
      </>
    );
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>

          <Navbar.Brand as={Link} to="/">
            Cash Management
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
};

// Get data from redux store
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

// Connect react component with redux store
export const Header = connect(mapStateToProps, { logout })(HeaderApp);
