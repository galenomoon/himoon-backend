export function paginatedResults(page = 1, data: []) {
  const currentPage = page || 1;
  const limit = 10;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;

  const results = {
    totalPages: Math.ceil(data.length / limit),
    totalItems: data.length,
    currentPage: currentPage,
    data: data.slice(startIndex, endIndex),
  };

  return results;
}