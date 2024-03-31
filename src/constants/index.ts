import { Filter } from "~/api";

export const OMNIVORE_ACCENT_COLOR = "#F6E0A0";

export const OMNIVORE_CLOUD_APP_BASE_URL = "https://omnivore.app";
export const OMNIVORE_CLOUD_API_BASE_URL = "https://api-prod.omnivore.app";

export const OMNIVORE_GRAPHQL_API_URL_PATH = "/api/graphql";

export const SAVED_SEARCHES: Filter[] = [
  {
    id: "inbox",
    name: "Inbox",
    filter: "in:inbox",
    position: 0,
    createdAt: "",
  },
  {
    id: "continue-reading",
    name: "Continue Reading",
    filter: "in:inbox sort:read-desc is:unread",
    position: 1,
    createdAt: "",
  },
  {
    id: "read-later",
    name: "Read Later",
    filter: "in:library",
    position: 2,
    createdAt: "",
  },
  {
    id: "highlights",
    name: "Highlights",
    filter: "has:highlights",
    position: 3,
    createdAt: "",
  },
  {
    id: "unlabeled",
    name: "Unlabeled",
    filter: "no:label",
    position: 4,
    createdAt: "",
  },
  {
    id: "archived",
    name: "Archived",
    filter: "in:archive",
    position: 5,
    createdAt: "",
  },
];

export const DEFAULT_SAVED_SEARCH = "inbox";
