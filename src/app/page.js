"use client";
import ProductFilters from "../components/product/Filters/ProductFilters";
import ProductCards from "../components/product/ProductCard";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
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

  const handleApplyFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <div className="flex gap-4 mx-auto m-8 max-w-screen-2xl">
      <div className="flex-shrink-0">
        <ProductFilters onApplyFilters={handleApplyFilters} />
      </div>
      <div className="flex-grow gap-6">
        <ProductCards products={products} filters={filters} />
      </div>
    </div>
  );
}
