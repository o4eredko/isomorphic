import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "src/utility/loader";


const routes = [
  {
    path: "red-button",
    component: lazy(() => import("src/RedButton/RedButton")),
  },
  {
    path: "feedmaker",
    component: lazy(() => import("src/FeedMaker/FeedMaker"))
  },
  {
    path: "google-crafter/settings",
    component: lazy(() => import("src/GoogleCrafter/settings"))
  },
  {
    path: "google-crafter/generations",
    component: lazy(() => import("src/GoogleCrafter/generations"))
  }
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={ <Loader /> }>
      <Switch>
        { routes.map((route, idx) => (
          <Route exact={ route.exact } key={ idx } path={ `${ url }/${ route.path }` }>
            <route.component />
          </Route>
        )) }
      </Switch>
    </Suspense>
  );
}
