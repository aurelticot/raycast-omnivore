import { SavedSearch } from "~/types";

export const OMNIVORE_ACCENT_COLOR = "#F6E0A0";

export const OMNIVORE_CLOUD_APP_BASE_URL = "https://omnivore.app";
export const OMNIVORE_CLOUD_API_BASE_URL = "https://api-prod.omnivore.app";

export const OMNIVORE_GRAPHQL_API_URL_PATH = "/api/graphql";

export const SAVED_SEARCHES: SavedSearch[] = [
  {
    id: "inbox",
    label: "Inbox",
    query: "in:inbox",
  },
  {
    id: "continue-reading",
    label: "Continue Reading",
    query: "in:inbox sort:read-desc is:unread",
  },
  {
    id: "read-later",
    label: "Read Later",
    query: "in:library",
  },
  {
    id: "highlights",
    label: "Highlights",
    query: "has:highlights",
  },
  {
    id: "unlabeled",
    label: "Unlabeled",
    query: "no:label",
  },
  {
    id: "archived",
    label: "Archived",
    query: "in:archive",
  },
];

export const DEFAULT_SAVED_SEARCH = "inbox";
