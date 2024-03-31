import { List } from "@raycast/api";
import { useCachedState } from "@raycast/utils";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { DEFAULT_SAVED_SEARCH, SAVED_SEARCHES } from "~/constants";
import { useAllLabelsQuery, useSavedFiltersQuery } from "~/hooks";

export type SavedSearchesDropdownProps = {
  onChange: (newQuery: string | undefined) => void;
};

export function SavedSearchesDropdown(props: SavedSearchesDropdownProps) {
  const { onChange } = props;

  const firstRender = useRef(true);

  const [selectedvalue, setSelectedValue] = useCachedState(
    "selected-saved-search",
    DEFAULT_SAVED_SEARCH
  );

  const { savedFilters } = useSavedFiltersQuery();
  const { labels } = useAllLabelsQuery();

  const savedSearches = useMemo(
    () => savedFilters ?? SAVED_SEARCHES,
    [savedFilters]
  );

  const sendQuery = useCallback(
    (value: string) => {
      const query = value.startsWith("label:")
        ? value
        : savedSearches.find((savedSearch) => savedSearch.id === value)?.filter;
      onChange(query);
    },
    [onChange]
  );

  const handleChange = useCallback((newValue: string) => {
    setSelectedValue(newValue);
    sendQuery(newValue);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      sendQuery(selectedvalue);
      firstRender.current = false;
    }
  }, []);

  return (
    <List.Dropdown
      tooltip="Select Saved Search"
      storeValue={false}
      value={selectedvalue}
      onChange={handleChange}
    >
      <List.Dropdown.Section title="Saved Searches">
        {savedSearches.map((savedSearch) => (
          <List.Dropdown.Item
            key={savedSearch.id}
            title={savedSearch.name}
            value={savedSearch.id}
          />
        ))}
      </List.Dropdown.Section>
      {labels ? (
        <List.Dropdown.Section title="Labels">
          {labels.map((label) => (
            <List.Dropdown.Item
              key={`label-${label.id}`}
              title={label.name}
              value={`label:"${label.name}"`}
            />
          ))}
        </List.Dropdown.Section>
      ) : null}
    </List.Dropdown>
  );
}
