export const fetchFilteredProducts = async (filters) => {
  const response = await fetch("http://localhost:5000/api/products/filter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
};
