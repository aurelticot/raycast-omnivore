import { Toast, showToast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { getApiClient, graphql } from "~/api";

const client = getApiClient();

const userQuery = graphql(`
  query Me {
    me {
      id
      name
      isFullUser
      picture
      profile {
        id
        username
        private
        pictureUrl
      }
    }
  }
`);

export function useUserQuery() {
  const { data, error, isLoading } = useCachedPromise(
    async () => {
      try {
        const result = await client.request(userQuery);
        return result.me;
      } catch (error: unknown) {
        await showToast({
          style: Toast.Style.Failure,
          title: "Error fetching the user",
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

  return { user: data, error, isLoading };
}
