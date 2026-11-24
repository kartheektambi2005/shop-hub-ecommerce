export function loadStored(key, fallback, isValid = () => true) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked (private mode); the app keeps working without persistence.
  }
}

export function removeStored(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
