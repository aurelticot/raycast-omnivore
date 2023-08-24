import { Toast, showToast } from "@raycast/api";
import { useCallback } from "react";

import { CreateArticleSavingRequestInput, getApiClient, graphql } from "~/api";

const client = getApiClient();

const createArticleSavingRequestMutation = graphql(`
  mutation CreateArticleSavingRequest(
    $input: CreateArticleSavingRequestInput!
  ) {
    createArticleSavingRequest(input: $input) {
      ... on CreateArticleSavingRequestSuccess {
        articleSavingRequest {
          id
          status
        }
      }
      ... on CreateArticleSavingRequestError {
        errorCodes
      }
    }
  }
`);

export function useArticleMutations() {
  const createArticle = useCallback(
    async (input: CreateArticleSavingRequestInput) => {
      const toast = await showToast({
        style: Toast.Style.Animated,
        title: `Saving link`,
      });

      try {
        const result = await client.request(
          createArticleSavingRequestMutation,
          {
            input,
          }
        );

        if ("error" in result.createArticleSavingRequest) {
          throw new Error("Something went wrong saving the link!");
        }

        toast.style = Toast.Style.Success;
        toast.title = `Link saved!`;

        // TODO: Return the info of the saved article
      } catch (error: unknown) {
        toast.style = Toast.Style.Failure;
        toast.title = `Failed to save the link!`;
        if (error instanceof Error) {
          toast.message = error.message;
        }
      }
    },
    []
  );

  return { createArticle };
}
