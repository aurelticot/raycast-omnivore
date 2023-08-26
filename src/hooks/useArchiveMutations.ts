import { Toast, showToast } from "@raycast/api";
import { useCallback } from "react";

import { getApiClient, graphql } from "~/api";

const client = getApiClient();

const setArchiveStatusMutation = graphql(`
  mutation SetArchiveStatus($id: ID!, $archived: Boolean!) {
    setLinkArchived(input: { linkId: $id, archived: $archived }) {
      ... on ArchiveLinkError {
        message
        errorCodes
      }
      ... on ArchiveLinkSuccess {
        linkId
        message
      }
    }
  }
`);

export function useArchiveMutations() {
  const setArchiveStatus = useCallback(
    async (id: string, archived: boolean) => {
      const toast = await showToast({
        style: Toast.Style.Animated,
        title: archived ? "Archiving the article" : "Unarchiving the article",
      });

      try {
        const result = await client.request(setArchiveStatusMutation, {
          id,
          archived,
        });

        if ("errorCodes" in result.setLinkArchived) {
          throw new Error(result.setLinkArchived.message);
        }

        toast.style = Toast.Style.Success;
        toast.title = archived ? "Article archived!" : "Article unarchived!";
      } catch (error: unknown) {
        toast.style = Toast.Style.Failure;
        toast.title = archived ? "Failed to archive!" : "Failed to unarchive!";
        if (error instanceof Error) {
          toast.message = error.message;
        }
      }
    },
    []
  );

  return { setArchiveStatus };
}
