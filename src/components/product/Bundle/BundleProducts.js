import React from "react";
import BundleProduct from "./BundleProduct";

const BundleProducts = ({
  selectedBundle,
  selectedSizes,
  selectedColors,
  setSelectedSizes,
  setSelectedColors,
}) => {
  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-md bg-white">
      <label className="text-gray-800 font-extrabold text-xl mb-3 block">
        Incluye:
      </label>
      <div className="max-h-96 overflow-y-auto">
        {selectedBundle?.Productos?.map((product) => (
          <BundleProduct
            key={product.ProductoID}
            product={product}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            setSelectedSizes={setSelectedSizes}
            setSelectedColors={setSelectedColors}
          />
        ))}
      </div>
    </div>
  );
};

export default BundleProducts;
