import React from "react";

const ProductSizeSelector = ({ validTallas, currentSize, onSizeChange }) => {
  return (
    <div className="mt-2">
      <label className="block text-gray-700 font-semibold mb-1">Talla:</label>
      <select
        value={currentSize?.TallaID || ""}
        onChange={(e) => {
          const selectedTalla = validTallas.find(
            (size) => size.TallaID === parseInt(e.target.value)
          );
          onSizeChange({
            TallaID: e.target.value,
            NombreTalla: selectedTalla?.NombreTalla,
          });
        }}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccionar Talla</option>
        {validTallas.map((size) => (
          <option key={size.TallaID} value={size.TallaID}>
            {size.NombreTalla}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSizeSelector;
