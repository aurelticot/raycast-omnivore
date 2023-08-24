import { Toast, showToast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { getApiClient, graphql } from "~/api";

const client = getApiClient();

const searchItemsQuery = graphql(`
  query Search($after: String, $first: Int, $query: String) {
    search(first: $first, after: $after, query: $query) {
      ... on SearchError {
        errorCodes
      }
      ... on SearchSuccess {
        edges {
          cursor
          node {
            id
            title
            slug
            url
            pageType
            contentReader
            createdAt
            isArchived
            readingProgressPercent
            readingProgressTopPercent
            readingProgressAnchorIndex
            author
            image
            description
            publishedAt
            ownedByViewer
            originalArticleUrl
            uploadFileId
            labels {
              id
              name
              color
            }
            pageId
            shortId
            quote
            annotation
            state
            siteName
            subscription
            readAt
            savedAt
            wordsCount
            highlights {
              id
              type
              shortId
              quote
              prefix
              suffix
              patch
              annotation
              createdByMe
              createdAt
              updatedAt
              sharedAt
              highlightPositionPercent
              highlightPositionAnchorIndex
              labels {
                id
                name
                color
                createdAt
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          totalCount
        }
      }
    }
  }
`);

type SearchQueryInputs = { first?: number; after?: string; query?: string };

export function useSearchQuery(options?: SearchQueryInputs) {
  const { data, error, isLoading, revalidate } = useCachedPromise(
    async (inputs: SearchQueryInputs) => {
      try {
        const result = await client.request(searchItemsQuery, inputs);

        if ("edges" in result.search) {
          return result.search;
        }

        throw new Error("Something went wrong getting the items");
      } catch (error: unknown) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Error fetching the items",
          message: error instanceof Error ? error.message : undefined,
        });
      }
    },
    [options || {}],
    {
      // TODO: Check what optimisation we can do here
      // keepPreviousData: true,
      // abortable: ... // TODO: Make the request abortable
    }
  );

  return { searchResult: data, error, isLoading, revalidate };
}
