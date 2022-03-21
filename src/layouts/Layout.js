import React, { useEffect } from "react";

import { connect } from "react-redux";
import { checkAuthentication, loadUser } from "../store/actions/auth";

import { ToastContainer, Slide } from "react-toastify";

// higher order react component
const LayoutApp = ({ checkAuthentication, loadUser, children }) => {
 
  useEffect(() => {
    checkAuthentication();
    loadUser();
  });

  return (
    <>
      <ToastContainer transition={Slide} />
      {children}
    </>
  );
};

// Connect react component with redux store
export const Layout = connect(null, { checkAuthentication, loadUser })(
  LayoutApp
);
