import { useEffect } from 'react';

export const DEFAULT_TITLE = 'ShopHub - Online Store Demo';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ShopHub` : DEFAULT_TITLE;
  }, [title]);
}
