import { GraphQLClient, request } from "graphql-request";
import { API_GRAPH_URL } from "../../config/constants";

const client = new GraphQLClient(API_GRAPH_URL);

function graph(QUERY, AUTH_TOKEN, VAR = {}) {
  return client.request(QUERY, VAR, {
    authorization: AUTH_TOKEN,
  });
}

export default graph;
