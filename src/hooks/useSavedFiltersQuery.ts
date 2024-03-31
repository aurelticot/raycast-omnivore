import { Toast, showToast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { getApiClient, graphql } from "~/api";

const client = getApiClient();

const savedFiltersQuery = graphql(`
  query Filters {
    filters {
      ... on FiltersError {
        errorCodes
      }
      ... on FiltersSuccess {
        filters {
          id
          name
          filter
          position
          folder
          description
          defaultFilter
          visible
          category
        }
      }
    }
  }
`);

export function useSavedFiltersQuery() {
  const {
    data: savedFilters,
    error,
    isLoading,
  } = useCachedPromise(
    async () => {
      try {
        const result = await client.request(savedFiltersQuery);

        if ("filters" in result.filters) {
          return result.filters.filters
            .filter((filter) => filter.visible)
            .sort((a, b) => a.position - b.position);
        }

        throw new Error("Something went wrong fetching the saved filters");
      } catch (error: unknown) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Error fetching the saved searches",
          message: error instanceof Error ? error.message : undefined,
        });
      }
    },
    [],
    {}
  );

  return { savedFilters, error, isLoading };
}
