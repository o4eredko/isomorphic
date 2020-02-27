import React, { lazy, Suspense } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorBoundary from "./ErrorBoundary";
import { PUBLIC_ROUTE } from "./route.constants";
import Loader from "src/utility/loader";


const Dashboard = lazy(() => import("./Dashboard/Dashboard"));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    exact: true,
    component: lazy(() => import("src/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import("src/SignUp/SignUp")),
  },
];

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  const isLoggedIn = useSelector(state => state.Auth.isLoggedIn);
  if (isLoggedIn) return <Route { ...rest }>{ children }</Route>;
  return (
    <Redirect
      to={ {
        pathname: PUBLIC_ROUTE.SIGN_IN,
        state: { from: location },
      } }
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={ <Loader /> }>
        <Router>
          <Switch>
            { publicRoutes.map((route, index) => (
              <Route key={ index } path={ route.path } exact={ route.exact }>
                <route.component />
              </Route>
            )) }
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
