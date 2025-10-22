export const mergeData = (
  primary: Record<string, any>[],
  comparison: Record<string, any>[]
): Record<string, any>[] => {
  const map = new Map<string, Record<string, any>>();

  const ensureRow = (date: string) => {
    if (!map.has(date)) map.set(date, { date });
    return map.get(date)!;
  };

  const getTitleKey = (item: Record<string, any>) =>
    Object.keys(item).find((k) => k !== "date");

  for (const item of primary || []) {
    const date = String(item.date);
    const titleKey = getTitleKey(item);
    if (!titleKey) continue;

    const row = ensureRow(date);
    row[titleKey] = item[titleKey];
  }

  for (const item of comparison || []) {
    const date = String(item.date);
    const titleKey = getTitleKey(item);
    if (!titleKey) continue;

    const row = ensureRow(date);

    if (row.hasOwnProperty(titleKey)) {
      row[`${titleKey}_2`] = item[titleKey];
    } else {
      row[titleKey] = item[titleKey];
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};