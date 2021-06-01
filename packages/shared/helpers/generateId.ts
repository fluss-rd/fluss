const generateId = ((): ((prefix: string) => string) => {
  let counter = 0;
  return (prefix: string): string => `${prefix}${++counter}`;
})();

export default generateId;
