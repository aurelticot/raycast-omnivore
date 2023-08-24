/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation SetArchiveStatus($id: ID!, $archived: Boolean!) {\n    setLinkArchived(input: { linkId: $id, archived: $archived }) {\n      ... on ArchiveLinkError {\n        message\n        errorCodes\n      }\n      ... on ArchiveLinkSuccess {\n        linkId\n        message\n      }\n    }\n  }\n":
    types.SetArchiveStatusDocument,
  "\n  mutation CreateArticleSavingRequest(\n    $input: CreateArticleSavingRequestInput!\n  ) {\n    createArticleSavingRequest(input: $input) {\n      ... on CreateArticleSavingRequestSuccess {\n        articleSavingRequest {\n          id\n          status\n        }\n      }\n      ... on CreateArticleSavingRequestError {\n        errorCodes\n      }\n    }\n  }\n":
    types.CreateArticleSavingRequestDocument,
  "\n  mutation SetLabels(\n    $pageId: ID!\n    $labelIds: [ID!]\n    $labels: [CreateLabelInput!]\n  ) {\n    setLabels(\n      input: { pageId: $pageId, labelIds: $labelIds, labels: $labels }\n    ) {\n      ... on SetLabelsError {\n        errorCodes\n      }\n      ... on SetLabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n        }\n      }\n    }\n  }\n":
    types.SetLabelsDocument,
  "\n  query Labels {\n    labels {\n      ... on LabelsError {\n        errorCodes\n      }\n      ... on LabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n          position\n          internal\n        }\n      }\n    }\n  }\n":
    types.LabelsDocument,
  "\n  query Search($after: String, $first: Int, $query: String) {\n    search(first: $first, after: $after, query: $query) {\n      ... on SearchError {\n        errorCodes\n      }\n      ... on SearchSuccess {\n        edges {\n          cursor\n          node {\n            id\n            title\n            slug\n            url\n            pageType\n            contentReader\n            createdAt\n            isArchived\n            readingProgressPercent\n            readingProgressTopPercent\n            readingProgressAnchorIndex\n            author\n            image\n            description\n            publishedAt\n            ownedByViewer\n            originalArticleUrl\n            uploadFileId\n            labels {\n              id\n              name\n              color\n            }\n            pageId\n            shortId\n            quote\n            annotation\n            state\n            siteName\n            subscription\n            readAt\n            savedAt\n            wordsCount\n            highlights {\n              id\n              type\n              shortId\n              quote\n              prefix\n              suffix\n              patch\n              annotation\n              createdByMe\n              createdAt\n              updatedAt\n              sharedAt\n              highlightPositionPercent\n              highlightPositionAnchorIndex\n              labels {\n                id\n                name\n                color\n                createdAt\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n      }\n    }\n  }\n":
    types.SearchDocument,
  "\n  query Me {\n    me {\n      id\n      name\n      isFullUser\n      picture\n      profile {\n        id\n        username\n        private\n        pictureUrl\n      }\n    }\n  }\n":
    types.MeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetArchiveStatus($id: ID!, $archived: Boolean!) {\n    setLinkArchived(input: { linkId: $id, archived: $archived }) {\n      ... on ArchiveLinkError {\n        message\n        errorCodes\n      }\n      ... on ArchiveLinkSuccess {\n        linkId\n        message\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation SetArchiveStatus($id: ID!, $archived: Boolean!) {\n    setLinkArchived(input: { linkId: $id, archived: $archived }) {\n      ... on ArchiveLinkError {\n        message\n        errorCodes\n      }\n      ... on ArchiveLinkSuccess {\n        linkId\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateArticleSavingRequest(\n    $input: CreateArticleSavingRequestInput!\n  ) {\n    createArticleSavingRequest(input: $input) {\n      ... on CreateArticleSavingRequestSuccess {\n        articleSavingRequest {\n          id\n          status\n        }\n      }\n      ... on CreateArticleSavingRequestError {\n        errorCodes\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateArticleSavingRequest(\n    $input: CreateArticleSavingRequestInput!\n  ) {\n    createArticleSavingRequest(input: $input) {\n      ... on CreateArticleSavingRequestSuccess {\n        articleSavingRequest {\n          id\n          status\n        }\n      }\n      ... on CreateArticleSavingRequestError {\n        errorCodes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SetLabels(\n    $pageId: ID!\n    $labelIds: [ID!]\n    $labels: [CreateLabelInput!]\n  ) {\n    setLabels(\n      input: { pageId: $pageId, labelIds: $labelIds, labels: $labels }\n    ) {\n      ... on SetLabelsError {\n        errorCodes\n      }\n      ... on SetLabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  mutation SetLabels(\n    $pageId: ID!\n    $labelIds: [ID!]\n    $labels: [CreateLabelInput!]\n  ) {\n    setLabels(\n      input: { pageId: $pageId, labelIds: $labelIds, labels: $labels }\n    ) {\n      ... on SetLabelsError {\n        errorCodes\n      }\n      ... on SetLabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Labels {\n    labels {\n      ... on LabelsError {\n        errorCodes\n      }\n      ... on LabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n          position\n          internal\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Labels {\n    labels {\n      ... on LabelsError {\n        errorCodes\n      }\n      ... on LabelsSuccess {\n        labels {\n          id\n          name\n          color\n          description\n          createdAt\n          position\n          internal\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Search($after: String, $first: Int, $query: String) {\n    search(first: $first, after: $after, query: $query) {\n      ... on SearchError {\n        errorCodes\n      }\n      ... on SearchSuccess {\n        edges {\n          cursor\n          node {\n            id\n            title\n            slug\n            url\n            pageType\n            contentReader\n            createdAt\n            isArchived\n            readingProgressPercent\n            readingProgressTopPercent\n            readingProgressAnchorIndex\n            author\n            image\n            description\n            publishedAt\n            ownedByViewer\n            originalArticleUrl\n            uploadFileId\n            labels {\n              id\n              name\n              color\n            }\n            pageId\n            shortId\n            quote\n            annotation\n            state\n            siteName\n            subscription\n            readAt\n            savedAt\n            wordsCount\n            highlights {\n              id\n              type\n              shortId\n              quote\n              prefix\n              suffix\n              patch\n              annotation\n              createdByMe\n              createdAt\n              updatedAt\n              sharedAt\n              highlightPositionPercent\n              highlightPositionAnchorIndex\n              labels {\n                id\n                name\n                color\n                createdAt\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Search($after: String, $first: Int, $query: String) {\n    search(first: $first, after: $after, query: $query) {\n      ... on SearchError {\n        errorCodes\n      }\n      ... on SearchSuccess {\n        edges {\n          cursor\n          node {\n            id\n            title\n            slug\n            url\n            pageType\n            contentReader\n            createdAt\n            isArchived\n            readingProgressPercent\n            readingProgressTopPercent\n            readingProgressAnchorIndex\n            author\n            image\n            description\n            publishedAt\n            ownedByViewer\n            originalArticleUrl\n            uploadFileId\n            labels {\n              id\n              name\n              color\n            }\n            pageId\n            shortId\n            quote\n            annotation\n            state\n            siteName\n            subscription\n            readAt\n            savedAt\n            wordsCount\n            highlights {\n              id\n              type\n              shortId\n              quote\n              prefix\n              suffix\n              patch\n              annotation\n              createdByMe\n              createdAt\n              updatedAt\n              sharedAt\n              highlightPositionPercent\n              highlightPositionAnchorIndex\n              labels {\n                id\n                name\n                color\n                createdAt\n              }\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Me {\n    me {\n      id\n      name\n      isFullUser\n      picture\n      profile {\n        id\n        username\n        private\n        pictureUrl\n      }\n    }\n  }\n"
): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      isFullUser\n      picture\n      profile {\n        id\n        username\n        private\n        pictureUrl\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
