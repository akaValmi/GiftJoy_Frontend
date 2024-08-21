// Modal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterButton from "../Filters/FilterButton"; // Asume que tienes este componente
import Warning from "../../Warning"; // Asume que tienes este componente

const Modal = ({
  selectedType,
  selectedProduct,
  selectedBundle,
  selectedColor,
  setSelectedColor,
  setSelectedSize,
  quantity,
  setQuantity,
  handleClose,
  warningMessage,
}) => {
  return (
    <AnimatePresence>
      {warningMessage && (
        <Warning
          message={warningMessage}
          onClose={() => setWarningMessage("")}
        />
      )}

      {selectedProduct || selectedBundle ? (
        <motion.div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            layoutId={
              selectedType === "product"
                ? `product-${selectedProduct?.ProductoID}`
                : `bundle-${selectedBundle?.BundleID}`
            }
            className="relative flex flex-col md:flex-row p-6 bg-white rounded-lg shadow-lg max-w-3xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={
                (selectedType === "product"
                  ? selectedColor?.ImgColor ||
                    selectedProduct?.Colores[0]?.ImgColor
                  : selectedBundle?.Colores.find(
                      (color) => color.ColorID === selectedColor?.ColorID
                    )?.ImgColor || selectedBundle?.Colores[0]?.ImgColor) ||
                "https://via.placeholder.com/150"
              }
              alt={
                (selectedType === "product"
                  ? selectedProduct?.NombreProducto
                  : selectedBundle?.NombreBundle) || "Product or Bundle"
              }
              className="md:w-1/2 h-full object-cover rounded-md"
            />

            <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
              <div>
                <motion.h2 className="text-2xl font-bold">
                  {selectedType === "product"
                    ? selectedProduct?.NombreProducto
                    : selectedBundle?.NombreBundle}
                </motion.h2>
                <motion.h3 className="text-xl text-gray-700">
                  L.
                  {(selectedType === "product"
                    ? selectedProduct?.Precio
                    : selectedBundle?.PrecioTotalBundle || 0
                  ).toFixed(2)}
                </motion.h3>
                <motion.p className="mt-4 text-gray-600">
                  {selectedType === "bundle"
                    ? selectedBundle?.DescripcionBundle
                    : "Description not available."}
                </motion.p>

                {selectedType === "product" &&
                  selectedProduct?.Tallas?.length > 0 && (
                    <div className="mt-4">
                      <label className="text-gray-700 font-bold">Tallas:</label>
                      <div className="flex space-x-2 mt-2">
                        {selectedProduct.Tallas.map((size) => (
                          <FilterButton
                            key={size.TallaID}
                            value={size.NombreTalla}
                            selectedValue={selectedSize?.NombreTalla}
                            onClick={() => setSelectedSize(size)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {selectedType === "product" &&
                  selectedProduct?.Colores?.length > 0 && (
                    <div className="mt-4">
                      <label className="text-gray-700 font-bold">
                        Colores:
                      </label>
                      <div className="flex space-x-2 mt-2">
                        {selectedProduct.Colores.map((color) => (
                          <FilterButton
                            key={color.ColorID}
                            value={color.NombreColor}
                            selectedValue={selectedColor?.NombreColor}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {selectedType === "bundle" &&
                  selectedBundle?.Colores?.length > 0 && (
                    <div className="mt-4">
                      <label className="text-gray-700 font-bold">
                        Colores:
                      </label>
                      <div className="flex space-x-2 mt-2">
                        {selectedBundle.Colores.map((color) => (
                          <FilterButton
                            key={color.ColorID}
                            value={color.NombreColor}
                            selectedValue={selectedColor?.NombreColor}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className="mt-4 flex items-center">
                <label className="mr-2 text-gray-700" htmlFor="quantity">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border rounded-md px-2 py-1"
                  min="1"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
