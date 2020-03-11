import React from "react";

import PageHeader from "src/utility/pageHeader";
import Box from "src/utility/box";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery, useSubscription } from "@apollo/react-hooks";

import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import LayoutWrapper from "src/utility/layoutWrapper";


const httpLink = new HttpLink({ uri: "http://localhost:8888/graphql/" });
const wsLink = new WebSocketLink({
  uri: "ws://localhost:8888/graphql/",
  options: {
    reconnect: true
  }
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
  wsLink,
  httpLink,
);

const createApolloClient = () => {
  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};

const REQUEST = gql`
    query {
        accounts {
            id
            name
        }
    }`;

const MUTATION = gql`
    mutation craft_ad(
        $craft_name: String!,
        $source_ad_set_id: ID!,
        $country_code: String!,
        $csv_data: String!,
        $target_account_id: ID!,
        $target_campaign_id: ID!
    ) {
        craft_ad(
            craft_name: $craft_name,
            source_ad_set_id: $source_ad_set_id,
            country_code: $country_code,
            csv_data: $csv_data,
            target_account_id: $target_account_id,
            target_campaign_id: $target_campaign_id
        )
    }
`;

const SUBSCRIPTION = gql`
    subscription progress {
        progress {
            name
            percents
        }
    }
`;

function Wrapped() {
  const [loading, setLoading] = React.useState(false);
  // const { data, loading } = useSubscription(SUBSCRIPTION);
  // const [craftAd, resp] = useMutation(MUTATION, {
  //   variables: {
  //     craft_name: "Helloy worald",
  //     source_ad_set_id: "23843323691730359",
  //     country_code: "GB",
  //     csv_data: "adset_name,city,ad_title,ad_url\nTest AdSet Name 1,London,Test Ad Name 1, https://github.com/burkovski\nTest AdSet Name 2,Manchester,Test Ad Name 2, https://github.com/burkovski",
  //     target_account_id: "act_410182513146595",
  //     target_campaign_id: "23843323562960359",
  //   }
  // });
  // const { loading, error, data } = useQuery(REQUEST);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <pre>Error :( { JSON.stringify(error, null, 4) }</pre>;
  // console.log(data);
  // return (
  //   <div onClick={ craftAd }>
  //     Hello world
  //     <pre>{ JSON.stringify(data, null, 4) }</pre>
  //   </div>
  // )
}

export default function FacebookCrafter(props) {
  const client = createApolloClient();
  return (
    <ApolloProvider client={ client }>
      <LayoutWrapper>
        <PageHeader>Facebook Crafter</PageHeader>
        <Box title="A?">
          <UploadForm />
        </Box>
      </LayoutWrapper>
    </ApolloProvider>
  )
}

