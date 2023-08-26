/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Key - Generate an API Key in Omnivore to allow access from Raycast */
  "apiKey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-articles` command */
  export type SearchArticles = ExtensionPreferences & {
  /** Colored Tags - Use the color of the tags defined in Omnivore in Raycast */
  "coloredTags": boolean,
  /** Max articles - Max articles shown in the list. The more, the slower. */
  "maxItems": "25" | "50" | "100" | "250" | "500"
}
  /** Preferences accessible in the `save-article` command */
  export type SaveArticle = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-articles` command */
  export type SearchArticles = {}
  /** Arguments passed to the `save-article` command */
  export type SaveArticle = {
  /** https://www.raycast.com/blog/hello-world */
  "url": string
}
}


declare module "swift:*" {
  function run<T = unknown, U = any>(command: string, input?: U): Promise<T>;
  export default run;
	export class SwiftError extends Error {
    stderr: string;
    stdout: string;
  }
}
