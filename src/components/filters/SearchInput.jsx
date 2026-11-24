import { useEffect, useId, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

function SearchInput({ value, onSearch, delayMs = 400 }) {
  const inputId = useId();
  const [draft, setDraft] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const debouncedDraft = useDebounce(draft, delayMs);

  // Keep the box in sync when the URL changes from outside (e.g. the navbar search).
  if (value !== previousValue) {
    setPreviousValue(value);
    setDraft(value);
  }

  useEffect(() => {
    onSearch(debouncedDraft);
    // Only fire when the debounced text changes, not when the parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDraft]);

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="visually-hidden">
        Search products
      </label>
      <span className="input-group-text" aria-hidden="true">
        <i className="bi bi-search" />
      </span>
      <input
        id={inputId}
        type="search"
        className="form-control"
        placeholder="Search products..."
        maxLength={80}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
    </div>
  );
}

export default SearchInput;
