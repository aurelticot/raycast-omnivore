import { Icon, Image, List, getPreferenceValues } from "@raycast/api";
import { getFavicon, getProgressIcon, useCachedState } from "@raycast/utils";
import { useCallback, useState } from "react";

import { HighlightType } from "~/api";
import { ItemActionsPanel, SavedSearchesDropdown } from "~/components";
import { OMNIVORE_ACCENT_COLOR } from "~/constants";
import { useSearchQuery, useUserQuery } from "~/hooks";
import {
  buildArticleDetailsMarkdown,
  formatRelativeDateFromNow,
} from "~/utils";

const preferences = getPreferenceValues<Preferences.SearchItems>();
const maxItems = Number(preferences.maxItems);

export function SearchItemsView() {
  const { user } = useUserQuery();

  const [savedSearchQuery, setSavedSearchQuery] = useState<string | undefined>(
    undefined
  );
  const [userQuery, setUserQuery] = useState("");
  const [showingDetail, setShowingDetail] = useCachedState(
    "showing-details",
    false
  );

  const query = [savedSearchQuery, userQuery]
    .filter((query) => !!query)
    .join(" ");

  const { searchResult, isLoading, revalidate } = useSearchQuery({
    first: maxItems,
    query,
  });

  const totalCount = searchResult?.pageInfo.totalCount;

  const items = searchResult?.edges.map((edge) => ({
    ...edge.node,
    cursor: edge.cursor,
  }));

  const handleSaveSearchChange = useCallback((newQuery: string | undefined) => {
    setSavedSearchQuery(newQuery);
  }, []);

  const handleToggleDetailsActionClick = useCallback(
    () => setShowingDetail((prev) => !prev),
    []
  );

  const handleToggleArchiveActionClick = useCallback(() => {
    revalidate();
  }, []);

  return (
    <List
      throttle
      searchText={userQuery}
      onSearchTextChange={setUserQuery}
      searchBarPlaceholder={
        items && totalCount
          ? `Search ${totalCount} items...`
          : `Search items...`
      }
      isLoading={isLoading}
      isShowingDetail={showingDetail}
      searchBarAccessory={
        <SavedSearchesDropdown onChange={handleSaveSearchChange} />
      }
    >
      {items &&
        items.map((item) => {
          const props: Partial<List.Item.Props> = showingDetail
            ? {
                detail: (
                  <List.Item.Detail
                    markdown={buildArticleDetailsMarkdown({
                      title: item.title,
                      description: item.description,
                      annotation:
                        item.annotation ||
                        (item.highlights || [])
                          .filter(
                            (highlight) => highlight.type === HighlightType.Note
                          )
                          .reduce<string | null | undefined>(
                            (_prev, current) => current.annotation,
                            undefined
                          ),
                      highlights: (item.highlights || [])
                        .filter(
                          (highlight) =>
                            highlight.type === HighlightType.Highlight
                        )
                        .sort(
                          (a, b) =>
                            (a.highlightPositionAnchorIndex || 0) -
                            (b.highlightPositionAnchorIndex || 0)
                        )
                        .map((highlight) => ({
                          quote: highlight.quote,
                          annotation: highlight.annotation,
                        })),
                    })}
                    metadata={
                      <List.Item.Detail.Metadata>
                        <List.Item.Detail.Metadata.Label
                          title="Reading Progress"
                          icon={getProgressIcon(
                            item.readingProgressPercent / 100 || 0,
                            OMNIVORE_ACCENT_COLOR
                          )}
                        />
                        <List.Item.Detail.Metadata.TagList title="Labels">
                          {(item.labels || []).map((label) => (
                            <List.Item.Detail.Metadata.TagList.Item
                              key={label.id}
                              text={label.name}
                              color={
                                preferences.coloredTags
                                  ? label.color
                                  : undefined
                              }
                            />
                          ))}
                        </List.Item.Detail.Metadata.TagList>
                        <List.Item.Detail.Metadata.Separator />
                        <List.Item.Detail.Metadata.Link
                          title="Source"
                          target={item.url}
                          text={item.siteName || "-"}
                        />
                        <List.Item.Detail.Metadata.Label
                          title="Author"
                          text={item.author || "-"}
                        />
                        <List.Item.Detail.Metadata.Label
                          title="Published"
                          text={
                            item.publishedAt
                              ? formatRelativeDateFromNow(item.publishedAt)
                              : "-"
                          }
                        />
                        <List.Item.Detail.Metadata.Label
                          title="Word Count"
                          text={String(item.wordsCount || "-")}
                        />
                        <List.Item.Detail.Metadata.Separator />
                        <List.Item.Detail.Metadata.Label
                          title="Saved"
                          text={
                            item.savedAt
                              ? formatRelativeDateFromNow(item.savedAt)
                              : "-"
                          }
                        />
                      </List.Item.Detail.Metadata>
                    }
                  />
                ),
              }
            : {
                accessories: [
                  ...(item.labels || []).map((label) => ({
                    tag: {
                      value: label.name,
                      color: preferences.coloredTags ? label.color : undefined,
                    },
                  })),
                  {
                    icon: getProgressIcon(
                      item.readingProgressPercent / 100 || 0,
                      OMNIVORE_ACCENT_COLOR
                    ),
                  },
                ],
              };

          return (
            <List.Item
              key={item.id}
              icon={
                item.url
                  ? getFavicon(item.url, { mask: Image.Mask.RoundedRectangle })
                  : Icon.Link
              }
              title={item.title}
              subtitle={showingDetail ? undefined : item.siteName || undefined}
              keywords={[
                ...(item.labels || []).map((label) => label.name),
                item.author || "",
              ]}
              {...props}
              actions={
                <ItemActionsPanel
                  itemId={item.id}
                  isItemArchived={item.isArchived}
                  itemSlug={item.slug}
                  itemUrl={item.url}
                  username={user?.profile.username}
                  onToggleDetailsClick={handleToggleDetailsActionClick}
                  onToggleArchiveClick={handleToggleArchiveActionClick}
                />
              }
            />
          );
        })}
    </List>
  );
}
