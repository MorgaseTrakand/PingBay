export const mergeData = (
  primary: Record<string, any>[],
  comparison: Record<string, any>[],
  valueKey: string
): Record<string, any>[] => {

  const map = new Map<string, any>();

  primary.forEach(item => {
    map.set(item.date, { date: item.date, [`${valueKey}1`]: item[valueKey] });
  });

  comparison.forEach(item => {
    if (map.has(item.date)) {
      map.get(item.date)[`${valueKey}2`] = item[valueKey];
    } else {
      map.set(item.date, { date: item.date, [`${valueKey}2`]: item[valueKey] });
    }
  });

  const merged = Array.from(map.values());
  return merged;
};
