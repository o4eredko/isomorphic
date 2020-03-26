import React from "react";

import { connect } from "react-redux";
import drawerActions from "src/Drawer/redux/drawer/actions";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";

import FacebookCrafter from "src/FacebookCrafter/components/FacebookCrafter";
import config from "src/FacebookCrafter/config/index.config";
import authHelper from "src/lib/helpers/authHelper";


const httpLink = new HttpLink({ uri: config.httpUrl });
const wsLink = new WebSocketLink({
  uri: config.wsUrl,
  options: {
    reconnect: true
  }
});

const authLink = setContext(async (_, { headers }) => {
  try {
    authHelper.checkExpiration(localStorage.getItem("access_token"));
  } catch {
    await authHelper.refreshToken();
  }
  const token = localStorage.getItem("access_token");
  return {
    headers: { ...headers, Authorization: `Bearer ${ token }` }
  };
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

const createApolloClient = () =>
  new ApolloClient({ link: link, cache: new InMemoryCache() });

const FacebookCrafterWrapper = (props) => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={ client }>
      <FacebookCrafter { ...props } />
    </ApolloProvider>
  )
};

function mapStateToProps({ drawer }) {
  return { drawerVisibility: drawer.drawerVisibility }
}

function mapDispatchToProps(dispatch) {
  const DRAWER_TYPE = "CRAFT_ADS_DRAWER";

  return {
    toggleDrawer: show => dispatch(show
      ? drawerActions.openDrawer({ drawerType: DRAWER_TYPE })
      : drawerActions.closeDrawer()
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookCrafterWrapper)
