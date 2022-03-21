import React from "react";

import { Switch, Route } from "react-router-dom";

// URL Routes for pages
import { Routes } from "./utils/Routes";

// layout
import { Layout } from "./layouts/Layout";

// Component
import { Header } from "./components/Navbar";
import { Loader } from "./components/Loader";

// Pages
import { Activation } from "./pages/auth/Activation";
import Dashboard from "./pages/Dashboard";
import { Homepage } from "./pages/Homepage";
import { LoginPage } from "./pages/auth/Loginpage";
import { Resetpassword } from "./pages/auth/Resetpassword";
import { ResetPasswordConfrim } from "./pages/auth/ResetPasswordConfrim";
import { Signup } from "./pages/auth/Signup";
import { AccountList } from "./pages/account/AccountList";
import { AddAccount } from "./pages/account/AddAccount";
import { EditAccount } from "./pages/account/EditAccount";
import { TransactionList } from './pages/transaction/TransactionList';
import { InflowList } from './pages/transaction/InflowList';
import { OutflowList } from './pages/transaction/OutflowList';

// import { GlobalProvider } from './context/AccountState';

export const App = () => {
  const RouteWithSidebar = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 4000);
      return () => clearTimeout(timer);
    }, []);
    return (
      <Route
        {...rest}
        render={(props) => (
          <>
            <Layout>
              {!loaded ? (
                <Loader />
              ) : (
                <>
                  <Header />
                  <Component {...props} />
                </>
              )}
            </Layout>
          </>
        )}
      />
    );
  };

  const RouteFullPage = ({ component: Component, ...rest }) => {
    const [loaded, setLoaded] = React.useState(false);
    React.useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 4000);
      return () => clearTimeout(timer);
    }, []);
    console.log(loaded);
    return (
      <Route
        {...rest}
        render={(props) => (
          <>
            <Layout>
              {!loaded ? (
                <Loader />
              ) : (
                <>
                  <Component {...props} />
                </>
              )}
            </Layout>
          </>
        )}
      />
    );
  };

  return (
    <>
      <Switch>
        <RouteWithSidebar
          component={Homepage}
          path={Routes.Dashboard.path}
          exact
        />
        <RouteFullPage
          component={LoginPage}
          path={Routes.Loginpage.path}
          exact
        />
        <RouteFullPage component={Signup} path={Routes.signup.path} exact />
        <RouteFullPage
          component={Activation}
          path={Routes.activation.path}
          exact
        />
        <RouteFullPage
          component={Resetpassword}
          path={Routes.resetpassword.path}
          exact
        />
        <RouteFullPage
          component={ResetPasswordConfrim}
          path={Routes.resetpasswordconfrim.path}
          exact
        />
        <RouteWithSidebar component={Dashboard} path={Routes.Home.path} exact />

        <RouteFullPage
          component={AccountList}
          path={Routes.accountList.path}
          exact
        />

        <RouteFullPage
          component={AddAccount}
          path={Routes.addAccount.path}
          exact
        />

        <RouteFullPage
          component={EditAccount}
          path={Routes.editAccount.path}
          exact
        />

        <RouteFullPage
          component={TransactionList}
          path={Routes.transactionList.path}
          exact
        />

        <RouteFullPage
          component={InflowList}
          path={Routes.inflowList.path}
          exact
        />

        <RouteFullPage
          component={OutflowList}
          path={Routes.outflowList.path}
          exact
        />
      </Switch>
    </>
  );
};
