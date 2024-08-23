import { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import {
  getCategories,
  getSizes,
  getBrands,
  getColors,
} from "@/services/products";

export default function ProductFilters({ onApplyFilters }) {
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    brand: "",
    color: "",
  });

  const [options, setOptions] = useState({
    categories: [],
    sizes: [],
    brands: [],
    colors: [],
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesData, sizesData, brandsData, colorsData] =
          await Promise.all([
            getCategories(),
            getSizes(),
            getBrands(),
            getColors(),
          ]);

        setOptions({
          categories: categoriesData.map((item) => item.NombreCategoria),
          sizes: sizesData.map((item) => item.NombreTalla),
          brands: brandsData.map((item) => item.NombreMarca),
          colors: colorsData.map((item) => item.NombreColor),
        });
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterClick = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName] === value ? "" : value,
    }));
  };

  const applyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );
    onApplyFilters(activeFilters); // Llamada al callback para aplicar filtros
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      size: "",
      brand: "",
      color: "",
    });
    onApplyFilters({}); // Llamada al callback para aplicar filtros con filtros vacíos
  };

  const filterSections = [
    { label: "Categoría", key: "category", options: options.categories },
    { label: "Tamaño", key: "size", options: options.sizes },
    { label: "Marca", key: "brand", options: options.brands },
    { label: "Color", key: "color", options: options.colors },
  ];

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-lg font-bold mb-4">Filtrar por:</h2>

      {filterSections.map(({ label, key, options }) => (
        <FilterSection
          key={key}
          label={label}
          options={options}
          selectedValue={filters[key]}
          onFilterClick={(value) => handleFilterClick(key, value)}
        />
      ))}

      <button
        onClick={applyFilters}
        className="w-full p-2 bg-blue-500 text-white font-bold rounded mb-2"
      >
        Aplicar Filtros
      </button>

      <button
        onClick={clearFilters}
        className="w-full p-2 bg-gray-500 text-white font-bold rounded"
      >
        Limpiar Filtros
      </button>
    </div>
  );
}
