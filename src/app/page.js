/*"use client";
import ProductFilters from "../components/UI/Filters/ProductFilters";
import ProductCards from "../components/UI/ProductCard";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/products${window.location.search}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [window.location.search]);

  return (
    <div className="flex gap-4 m-8">
      <div className="w-1/4">
        <ProductFilters />
      </div>
      <div className="w-3/4">
        <ProductCards products={products} />
      </div>
    </div>
  );
}
*/
"use client";
import ProductFilters from "../components/UI/Filters/ProductFilters";
import ProductCards from "../components/UI/ProductCard";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== "undefined") {
      const fetchProducts = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const query = Object.fromEntries(searchParams.entries());

        setFilters(query);

        try {
          const res = await fetch(`/api/products?${searchParams.toString()}`);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
          // Handle error as needed (e.g., show an error message)
        }
      };

      fetchProducts();
    }
  }, [window.location.search]);

  return (
    <div className="flex gap-4 m-8">
      <div className="w-1/4">
        <ProductFilters />
      </div>
      <div className="w-3/4">
        <ProductCards products={products} filters={filters} />
      </div>
    </div>
  );
}
