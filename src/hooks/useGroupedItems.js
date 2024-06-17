function extractBaseTitle(title) {
  const match = title.match(/(.*) part \d+/i);
  return match ? match[1].trim() : title;
}

function useGroupedItems(items, extractBaseTitle) {
  const groupedItems = items.reduce((acc, item) => {
    const baseTitle = extractBaseTitle(item.title);
    if (!acc[baseTitle]) {
      acc[baseTitle] = [];
    }
    acc[baseTitle].push(item);
    return acc;
  }, {});

  return groupedItems;
}

export { useGroupedItems, extractBaseTitle };
