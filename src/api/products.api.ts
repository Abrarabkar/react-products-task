export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
    images: string[];
    category: string;
  }
  
  interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  const BASE_URL = "https://dummyjson.com/products";
  
  export async function getProducts(
    limit = 10,
    skip = 0,
    search = ""
  ): Promise<ProductsResponse> {
    const endpoint = search.trim()
      ? `${BASE_URL}/search?q=${encodeURIComponent(
          search.trim()
        )}&limit=${limit}&skip=${skip}`
      : `${BASE_URL}?limit=${limit}&skip=${skip}`;
  
    const response = await fetch(endpoint);
  
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
  
    return response.json();
  }
  
  export async function getProductById(
    id: number
  ): Promise<Product> {
    const response = await fetch(`${BASE_URL}/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
  
    return response.json();
  }
  
  export async function getProductCategories(): Promise<
    { slug: string; name: string; url: string }[]
  > {
    const response = await fetch(`${BASE_URL}/categories`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch product categories");
    }
  
    return response.json();
  }