import { useState, useEffect } from "react";

const useLoadMore = (items, itemsPerPage = 10) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (items && items.length > 0) {
      setVisibleItems(items.slice(0, itemsPerPage));
    }
  }, [items, itemsPerPage]);

  const loadMoreItems = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextItems = items.slice(
        visibleItems.length,
        visibleItems.length + itemsPerPage
      );
      setVisibleItems(prev => [...prev, ...nextItems]);

      if (visibleItems.length + nextItems.length >= items.length) {
        setHasMore(false);
      }

      setLoadingMore(false);
    }, 1000);
  };

  return { visibleItems, loadMoreItems, hasMore, loadingMore };
};

export default useLoadMore;
