
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Products() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", search, page],
    queryFn: () => getProducts(limit, page * limit, search),
    placeholderData: (previousData) => previousData,
  });

  function handleSearch(value: string) {
    setSearch(value);
    setPage(0);
  }

  if (isPending) {
    return <p className="p-8 text-center">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-center text-red-600">
        Failed to load products. Please try again.
      </p>
    );
  }

  const totalPages = Math.ceil(data.total / limit);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold">Products</h1>

        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
          className="mb-8 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {data.products.length === 0 ? (
          <p className="py-12 text-center text-gray-500">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                />

                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>
                    {product.category}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="mb-2 text-lg font-semibold">
                    ${product.price}
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    Rating: ⭐ {product.rating}
                  </p>

                  <a
                    href={`/products/${product.id}`}
                    className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    View Details
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((current) => current - 1)}
            disabled={page === 0}
            className="rounded-md border bg-white px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {Math.max(1, totalPages)}
          </span>

          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            disabled={(page + 1) * limit >= data.total}
            className="rounded-md border bg-white px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
