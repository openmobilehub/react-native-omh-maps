export const getPlugin = async () => {
  return (await import('./_optionalOpenstreetmapPlugin')).default;
};
