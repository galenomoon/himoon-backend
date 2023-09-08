export function paginatedResults(page: number, data: []) {
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    totalPages: Math.ceil(data.length / limit),
    currentPage: page,
    data: data.slice(startIndex, endIndex),
  };

  return results;
}
