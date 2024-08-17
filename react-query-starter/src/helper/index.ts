export const calculatePageCount = (pageSize: number, totalItems: number) => {
  return totalItems < pageSize ? 1 : Math.ceil(totalItems / pageSize);
};
