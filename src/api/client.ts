import { getPreferenceValues } from "@raycast/api";
import { GraphQLClient } from "graphql-request";

import {
  OMNIVORE_CLOUD_API_BASE_URL,
  OMNIVORE_GRAPHQL_API_URL_PATH,
} from "~/constants";

export function getApiClient() {
  const preferences = getPreferenceValues<Preferences>();

  const apiUrl = `${OMNIVORE_CLOUD_API_BASE_URL}${OMNIVORE_GRAPHQL_API_URL_PATH}`;

  const client = new GraphQLClient(apiUrl, {
    headers: {
      authorization: preferences.apiKey,
    },
  });

  return client;
}
