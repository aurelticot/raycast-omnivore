import { Toast, showToast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { getApiClient, graphql } from "~/api";

const client = getApiClient();

const labelsQuery = graphql(`
  query Labels {
    labels {
      ... on LabelsError {
        errorCodes
      }
      ... on LabelsSuccess {
        labels {
          id
          name
          color
          description
          createdAt
          position
          internal
        }
      }
    }
  }
`);

export function useAllLabelsQuery() {
  const {
    data: labels,
    error,
    isLoading,
  } = useCachedPromise(
    async () => {
      try {
        const result = await client.request(labelsQuery);

        if ("labels" in result.labels) {
          return result.labels.labels;
        }

        throw new Error("Something went wrong fetching the labels");
      } catch (error: unknown) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Error fetching the labels",
          message: error instanceof Error ? error.message : undefined,
        });
      }
    },
    [],
    {
      // TODO: Check what optimisation we can do here
      // keepPreviousData: true,
      // abortable: ... // TODO: Make the request abortable
    }
  );

  return { labels, error, isLoading };
}
