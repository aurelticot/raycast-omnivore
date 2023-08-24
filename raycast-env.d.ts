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
  /** Preferences accessible in the `search-items` command */
  export type SearchItems = ExtensionPreferences & {
  /** Colored Tags - Use the color of the tags defined in Omnivore in Raycast */
  "coloredTags": boolean,
  /** Max items - Max items shown in the list */
  "maxItems": "25" | "50" | "100" | "250" | "500"
}
  /** Preferences accessible in the `save-link` command */
  export type SaveLink = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-items` command */
  export type SearchItems = {}
  /** Arguments passed to the `save-link` command */
  export type SaveLink = {
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
