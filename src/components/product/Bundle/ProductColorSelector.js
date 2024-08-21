import React from "react";

const ProductColorSelector = ({
  validColores,
  currentColor,
  onColorChange,
}) => {
  return (
    <div className="mt-2">
      <label className="block text-gray-700 font-semibold mb-1">Colores:</label>
      <select
        value={currentColor?.ColorID || ""}
        onChange={(e) => {
          const selectedColor = validColores.find(
            (color) => color.ColorID === parseInt(e.target.value)
          );
          onColorChange({
            ColorID: e.target.value,
            NombreColor: selectedColor?.NombreColor,
            ImgColor: selectedColor?.ImgColor,
          });
        }}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccionar Color</option>
        {validColores.map((color) => (
          <option key={color.ColorID} value={color.ColorID}>
            {color.NombreColor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductColorSelector;
