export const getPlugin = async () => {
  return (await import('./_optionalMapboxPlugin')).default;
};
