import {
  ArticleSavingRequestStatus,
  ContentReader,
  HighlightType,
  PageType,
} from "~/api";

export interface SavedSearch {
  id: string;
  label: string;
  query: string;
}

export type Item = {
  __typename?: "SearchItemEdge";
  cursor: string;
  node: {
    __typename?: "SearchItem";
    id: string;
    title: string;
    slug: string;
    url: string;
    pageType: PageType;
    contentReader: ContentReader;
    createdAt: string;
    isArchived: boolean;
    readingProgressPercent: number;
    readingProgressTopPercent?: number | null;
    readingProgressAnchorIndex: number;
    author?: string | null;
    image?: string | null;
    description?: string | null;
    publishedAt?: string | null;
    ownedByViewer?: boolean | null;
    originalArticleUrl?: string | null;
    uploadFileId?: string | null;
    pageId?: string | null;
    shortId?: string | null;
    quote?: string | null;
    annotation?: string | null;
    state?: ArticleSavingRequestStatus | null;
    siteName?: string | null;
    subscription?: string | null;
    readAt?: string | null;
    savedAt: string;
    wordsCount?: number | null;
    labels?: Array<{
      __typename?: "Label";
      id: string;
      name: string;
      color: string;
    }> | null;
    highlights?: Array<{
      __typename?: "Highlight";
      id: string;
      type: HighlightType;
      shortId: string;
      quote?: string | null;
      prefix?: string | null;
      suffix?: string | null;
      patch?: string | null;
      annotation?: string | null;
      createdByMe: boolean;
      createdAt: string;
      updatedAt: string;
      sharedAt?: string | null;
      highlightPositionPercent?: number | null;
      highlightPositionAnchorIndex?: number | null;
      labels?: Array<{
        __typename?: "Label";
        id: string;
        name: string;
        color: string;
        createdAt?: string | null;
      }> | null;
    }> | null;
  };
};
