import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "src/utility/loader";


export const routes = {
  root: {
    path: "",
    component: lazy(() => import("src/Dashboard/ServiceList")),
    exact: true,
  },
  red_button: {
    path: "red-button",
    component: lazy(() => import("src/RedButton/RedButton")),
  },
  feedmaker: {
    path: "feedmaker",
    component: lazy(() => import("src/FeedMaker/FeedMaker"))
  },
  google_crafter_settings: {
    path: "google-crafter/settings",
    component: lazy(() => import("src/GoogleCrafter/settings"))
  },
  google_crafter_generations: {
    path: "google-crafter/generations",
    component: lazy(() => import("src/GoogleCrafter/generations"))
  },
  facebook_crafter: {
    path: "facebook-crafter",
    component: lazy(() => import("src/FacebookCrafter/"))
  },
  rabbit_ws: {
    path: "rabbit-ws",
    component: lazy(() => import("src/RabbitWs/"))
  }
};

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={ <Loader /> }>
      <Switch>
        { Object.values(routes).map((route, idx) => (
          <Route exact={ route.exact } key={ idx } path={ `${ url }/${ route.path }` }>
            <route.component />
          </Route>
        )) }
      </Switch>
    </Suspense>
  );
}
