import {
  Action,
  ActionPanel,
  Form,
  Icon,
  LaunchProps,
  popToRoot,
} from "@raycast/api";
import { useCallback, useState } from "react";
import { minLength, safeParse, string, url } from "valibot";

import { useArticleMutations } from "~/hooks";

type SaveLinkValues = {
  url: string;
};

export type SaveLinkViewProps = LaunchProps<{
  arguments: Arguments.SaveLink;
  draftValues: SaveLinkValues;
}>;

export function SaveLinkView(props: SaveLinkViewProps) {
  const { arguments: args, draftValues } = props;

  const defaultUrl = args.url || draftValues?.url;

  const [urlError, setUrlError] = useState<string | undefined>();
  const { createArticle } = useArticleMutations();

  const handleSubmit = useCallback(async (values: SaveLinkValues) => {
    const error = validateUrl(values.url);
    if (error) {
      setUrlError(error);
      return false;
    }
    await createArticle({
      url: values.url,
    });
    popToRoot();
  }, []);

  const handleUrlFieldChange = useCallback((value: string | undefined) => {
    const error = validateUrl(value);
    // Do not display the error in the UI for every change, do it on the blur even instead
    if (!error) setUrlError(undefined);
  }, []);

  const handleUrlFieldBlur = useCallback((value: string | undefined) => {
    const error = validateUrl(value);
    setUrlError(error);
  }, []);

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Save in Omnivore"
            icon={Icon.SaveDocument}
            onSubmit={handleSubmit}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="url"
        title="URL"
        defaultValue={defaultUrl}
        autoFocus
        placeholder="https://www.raycast.com/blog/hello-world"
        onChange={handleUrlFieldChange}
        error={urlError}
        onBlur={(event) => handleUrlFieldBlur(event.target.value)}
      />
    </Form>
  );
}

export function validateUrl(value: string | undefined) {
  const urlSchema = string("Must be a URL", [
    (minLength(1, "Should not be empty"), url("Should be a valid URL")),
  ]);

  const result = safeParse(urlSchema, value);

  if (!result.success) {
    return result.error.message;
  }
  return;
}
