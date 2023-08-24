import { Action, ActionPanel, Icon } from "@raycast/api";
import { useCallback } from "react";

import { OMNIVORE_CLOUD_APP_BASE_URL } from "~/constants";
import { useArchiveMutations } from "~/hooks";

export type ItemActionsPanelProps = {
  username?: string;
  itemId: string;
  isItemArchived: boolean;
  itemSlug: string;
  itemUrl?: string;
  onToggleDetailsClick: () => void;
  onToggleArchiveClick: () => void;
};

export function ItemActionsPanel(props: ItemActionsPanelProps) {
  const {
    itemId,
    isItemArchived,
    itemSlug,
    itemUrl,
    username,
    onToggleDetailsClick,
    onToggleArchiveClick,
  } = props;

  const { setArchiveStatus } = useArchiveMutations();

  const handleToggleArchiveClick = useCallback(async () => {
    await setArchiveStatus(itemId, !isItemArchived);
    onToggleArchiveClick();
  }, [itemId, isItemArchived]);

  return (
    <ActionPanel>
      {username ? (
        <Action.OpenInBrowser
          title="Open in Omnivore"
          url={`${OMNIVORE_CLOUD_APP_BASE_URL}/${username}/${itemSlug}`}
        />
      ) : null}
      {itemUrl ? (
        <>
          <Action.OpenInBrowser title="Open Original Source" url={itemUrl} />
          <Action.CopyToClipboard title="Copy Original URL" content={itemUrl} />
        </>
      ) : null}
      <Action
        title={isItemArchived ? "Unarchive" : "Archive"}
        icon={Icon.HardDrive}
        onAction={handleToggleArchiveClick}
      />
      <Action
        title="Toggle Details"
        icon={Icon.AppWindowSidebarLeft}
        onAction={onToggleDetailsClick}
      />
    </ActionPanel>
  );
}
