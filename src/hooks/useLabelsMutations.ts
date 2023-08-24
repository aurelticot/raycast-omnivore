import { Toast, showToast } from "@raycast/api";
import { useCallback } from "react";

import { getApiClient, graphql } from "~/api";

const client = getApiClient();

const setLabelsMutation = graphql(`
  mutation SetLabels(
    $pageId: ID!
    $labelIds: [ID!]
    $labels: [CreateLabelInput!]
  ) {
    setLabels(
      input: { pageId: $pageId, labelIds: $labelIds, labels: $labels }
    ) {
      ... on SetLabelsError {
        errorCodes
      }
      ... on SetLabelsSuccess {
        labels {
          id
          name
          color
          description
        }
      }
    }
  }
`);

export function useLabelsMutations() {
  const setLabels = useCallback(async (pageId: string, labelIds: string[]) => {
    const hasMultipleLabels = labelIds.length > 1;
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: `Adding label${hasMultipleLabels ? "s" : ""}`,
    });

    try {
      const result = await client.request(setLabelsMutation, {
        pageId,
        labelIds,
      });

      if ("errorCodes" in result.setLabels) {
        throw new Error("Something went wrong setting labels");
      }

      toast.style = Toast.Style.Success;
      toast.title = `Label${hasMultipleLabels ? "s" : ""} added!`;
    } catch (error: unknown) {
      toast.style = Toast.Style.Failure;
      toast.title = `Failed to add label${hasMultipleLabels ? "s" : ""}!`;
      if (error instanceof Error) {
        toast.message = error.message;
      }
    }
  }, []);

  return { setLabels };
}
