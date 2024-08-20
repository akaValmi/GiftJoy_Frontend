/*
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products";
import FilterButton from "./Filters/FilterButton";

export default function ProductCards({ filters }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts(filters);
        setProducts(data.productos);
        setBundles(data.bundles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]);

  const selectedProduct = products.find(
    (item) => item.ProductoID === selectedId
  );
  const selectedBundle = bundles.find((item) => item.BundleID === selectedId);

  const handleClose = () => {
    setSelectedId(null);
    setSelectedType(null);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const addToCart = () => {
    const item = selectedType === "product" ? selectedProduct : selectedBundle;
    if (item) {
      const cartItem = {
        id: item.ProductoID || item.BundleID,
        name:
          selectedType === "product" ? item.NombreProducto : item.NombreBundle,
        price:
          selectedType === "product" ? item.Precio : item.PrecioTotalBundle,
        quantity: quantity,
        ItemTypeID: selectedType === "product" ? 1 : 2, // 1 for products, 2 for bundles
        sizeId: selectedSize, // Add size ID
        colorId: selectedColor, // Add color ID
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log(`Added to cart: ${quantity} of ${cartItem.name}`);
      handleClose();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((item) => (
        <motion.div
          key={item.ProductoID}
          layoutId={`product-${item.ProductoID}`}
          onClick={() => {
            setSelectedId(item.ProductoID);
            setSelectedType("product");
          }}
          className="border rounded-lg cursor-pointer bg-white flex flex-col"
          style={{ width: "250px", height: "400px" }} // Tamaño fijo de la tarjeta
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-2/3 overflow-hidden">
            <img
              src={
                item.Colores[0]?.ImgColor || "https://via.placeholder.com/150"
              }
              alt={item.NombreProducto}
              className="w-full h-full object-cover" // Ajusta la imagen para llenar el contenedor
            />
          </div>
          <div className="flex flex-col p-4 h-1/3">
            <motion.h5 className="text-gray-500 text-sm truncate">
              {item.NombreProducto}
            </motion.h5>
            <motion.h2 className="text-lg font-bold mt-1">
              L. {item.Precio.toFixed(2)}
            </motion.h2>
          </div>
        </motion.div>
      ))}

      {bundles.map((item) => (
        <motion.div
          key={item.BundleID}
          layoutId={`bundle-${item.BundleID}`}
          onClick={() => {
            setSelectedId(item.BundleID);
            setSelectedType("bundle");
          }}
          className="border rounded-lg cursor-pointer bg-white flex flex-col"
          style={{ width: "250px", height: "400px" }} // Tamaño fijo de la tarjeta
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-2/3 overflow-hidden">
            <img
              src={
                item?.Colores[0]?.ImgColor || "https://via.placeholder.com/150"
              }
              alt={item.NombreBundle}
              className="w-full h-full object-cover" // Ajusta la imagen para llenar el contenedor
            />
          </div>
          <div className="flex flex-col p-4 h-1/3">
            <motion.h5 className="text-gray-500 text-sm truncate">
              {item.NombreBundle}
            </motion.h5>
            <motion.h2 className="text-lg font-bold mt-1">
              L. {item.PrecioTotalBundle.toFixed(2)}
            </motion.h2>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={
                selectedType === "product"
                  ? `product-${selectedId}`
                  : `bundle-${selectedId}`
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
                        <label className="text-gray-700 font-bold">
                          Tallas:
                        </label>
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
                              onClick={() => {
                                setSelectedColor(color);
                                // Update image when color is selected
                              }}
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

                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={addToCart}
                >
                  Añadir al carrito
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

*/
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products";
import FilterButton from "./Filters/FilterButton";
import Warning from "../Warning";

export default function ProductCards({ filters }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts(filters);
        setProducts(data.productos);
        setBundles(data.bundles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]);

  const selectedProduct = products.find(
    (item) => item.ProductoID === selectedId
  );
  const selectedBundle = bundles.find((item) => item.BundleID === selectedId);

  const handleClose = () => {
    setSelectedId(null);
    setSelectedType(null);
    setSelectedSize(null);
    setSelectedColor(null);
  };
  /*
  const addToCart = () => {
    const item = selectedType === "product" ? selectedProduct : selectedBundle;
    if (item) {
      const cartItem = {
        id: item.ProductoID || item.BundleID,
        name:
          selectedType === "product" ? item.NombreProducto : item.NombreBundle,
        price:
          selectedType === "product" ? item.Precio : item.PrecioTotalBundle,
        quantity: quantity,
        ItemTypeID: selectedType === "product" ? 1 : 2, // 1 for products, 2 for bundles
        sizeId: selectedSize, // Add size ID
        colorId: selectedColor, // Add color ID
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log(`Added to cart: ${quantity} of ${cartItem.name}`);
      handleClose();
    }
  };
*/

  const addToCart = () => {
    const item = selectedType === "product" ? selectedProduct : selectedBundle;

    if (!item) return;

    // Validación para producto
    if (selectedType === "product") {
      if (!selectedSize) {
        setWarningMessage("Debe seleccionar una talla para el producto.");
        return;
      }
      if (!selectedColor) {
        setWarningMessage("Debe seleccionar un color para el producto.");
        return;
      }
    }

    // Validación para bundle
    if (selectedType === "bundle" && !selectedColor) {
      setWarningMessage("Debe seleccionar un color para el bundle.");
      return;
    }

    const cartItem = {
      id: item.ProductoID || item.BundleID,
      name:
        selectedType === "product" ? item.NombreProducto : item.NombreBundle,
      price: selectedType === "product" ? item.Precio : item.PrecioTotalBundle,
      quantity: quantity,
      ItemTypeID: selectedType === "product" ? 1 : 2, // 1 for products, 2 for bundles
      sizeId: selectedSize, // Add size ID, will be null if not selected
      colorId: selectedColor, // Add color ID, will be null if not selected
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(`Added to cart: ${quantity} of ${cartItem.name}`);
    handleClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((item) => (
        <motion.div
          key={item.ProductoID}
          layoutId={`product-${item.ProductoID}`}
          onClick={() => {
            setSelectedId(item.ProductoID);
            setSelectedType("product");
          }}
          className="border rounded-lg cursor-pointer bg-white flex flex-col"
          style={{ width: "250px", height: "400px" }} // Tamaño fijo de la tarjeta
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-2/3 overflow-hidden">
            <img
              src={
                item.Colores[0]?.ImgColor || "https://via.placeholder.com/150"
              }
              alt={item.NombreProducto}
              className="w-full h-full object-cover" // Ajusta la imagen para llenar el contenedor
            />
          </div>
          <div className="flex flex-col p-4 h-1/3">
            <motion.h5 className="text-gray-500 text-sm truncate">
              {item.NombreProducto}
            </motion.h5>
            <motion.h2 className="text-lg font-bold mt-1">
              L. {item.Precio.toFixed(2)}
            </motion.h2>
          </div>
        </motion.div>
      ))}

      {bundles.map((item) => (
        <motion.div
          key={item.BundleID}
          layoutId={`bundle-${item.BundleID}`}
          onClick={() => {
            setSelectedId(item.BundleID);
            setSelectedType("bundle");
          }}
          className="border rounded-lg cursor-pointer bg-white flex flex-col"
          style={{ width: "250px", height: "400px" }} // Tamaño fijo de la tarjeta
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-full h-2/3 overflow-hidden">
            <img
              src={
                item?.Colores[0]?.ImgColor || "https://via.placeholder.com/150"
              }
              alt={item.NombreBundle}
              className="w-full h-full object-cover" // Ajusta la imagen para llenar el contenedor
            />
          </div>
          <div className="flex flex-col p-4 h-1/3">
            <motion.h5 className="text-gray-500 text-sm truncate">
              {item.NombreBundle}
            </motion.h5>
            <motion.h2 className="text-lg font-bold mt-1">
              L. {item.PrecioTotalBundle.toFixed(2)}
            </motion.h2>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {warningMessage && (
          <Warning
            message={warningMessage}
            onClose={() => setWarningMessage("")}
          />
        )}

        {selectedId && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={
                selectedType === "product"
                  ? `product-${selectedId}`
                  : `bundle-${selectedId}`
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
                        <label className="text-gray-700 font-bold">
                          Tallas:
                        </label>
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
                              onClick={() => {
                                setSelectedColor(color);
                                // Update image when color is selected
                              }}
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

                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={addToCart}
                >
                  Añadir al carrito
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
