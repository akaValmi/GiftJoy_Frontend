import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductColorSelector from "./ProductColorSelector";

const BundleProduct = ({
  product,
  selectedSizes,
  selectedColors,
  setSelectedSizes,
  setSelectedColors,
}) => {
  const validTallas = product.Tallas?.filter((size) => size !== null) || [];
  const validColores = product.Colores?.filter((color) => color !== null) || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSizeChange = (newSize, index) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [product.ProductoID]: {
        ...prevSizes[product.ProductoID],
        [index]: newSize,
      },
    }));
  };

  const handleColorChange = (newColor, index) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [product.ProductoID]: {
        ...prevColors[product.ProductoID],
        [index]: newColor,
      },
    }));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < product.Cantidad - 1 ? prevIndex + 1 : product.Cantidad - 1
    );
  };

  return (
    <motion.div
      className="mt-2 p-3 border border-gray-200 rounded-md shadow-sm bg-gray-50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h4
        className="font-bold text-gray-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {product.NombreProducto} x{product.Cantidad}
      </motion.h4>

      <motion.div
        className="relative mt-4 p-2 bg-white rounded-md shadow-sm border border-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="w-full text-center">
          <motion.h5
            className="text-gray-600"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {product.NombreProducto} #{currentIndex + 1}
          </motion.h5>

          {validTallas.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <ProductSizeSelector
                validTallas={validTallas}
                currentSize={
                  selectedSizes[product.ProductoID]?.[currentIndex] || null
                }
                onSizeChange={(newSize) =>
                  handleSizeChange(newSize, currentIndex)
                }
              />
            </motion.div>
          )}

          {validColores.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <ProductColorSelector
                validColores={validColores}
                currentColor={
                  selectedColors[product.ProductoID]?.[currentIndex] || null
                }
                onColorChange={(newColor) =>
                  handleColorChange(newColor, currentIndex)
                }
              />
            </motion.div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <motion.button
            onClick={handlePrev}
            className="p-2 bg-gray-200 rounded-full"
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            &larr;
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="p-2 bg-gray-200 rounded-full"
            disabled={currentIndex === product.Cantidad - 1}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            &rarr;
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BundleProduct;
