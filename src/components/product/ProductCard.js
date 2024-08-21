/*
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products";
import FilterButton from "./Filters/FilterButton";
import Warning from "../Warning";
import BundleProducts from "./Bundle/BundleProducts";
import ProductCard from "./Cards/ProductCard";
import BundleCard from "./Cards/BundleCard";

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
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

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
    const cartItems = [];

    if (selectedType === "bundle" && selectedBundle?.Productos?.length > 0) {
      if (!selectedColor) {
        setWarningMessage("Debe seleccionar un color para el bundle.");
        return;
      }

      const bundle = {
        id: selectedBundle.BundleID,
        name: selectedBundle.NombreBundle,
        price: selectedBundle.PrecioTotalBundle,
        quantity: quantity,
        ItemTypeID: 2,
        colorId: selectedColor,
        productos: [],
      };

      for (const product of selectedBundle.Productos) {
        for (let i = 0; i < product.Cantidad; i++) {
          const size = selectedSizes[product.ProductoID]?.[i] || null;
          const color = selectedColors[product.ProductoID]?.[i] || null;

          if (product.Tallas?.length > 0 && !size) {
            setWarningMessage(
              `Debe seleccionar una talla para el producto ${
                product.NombreProducto
              }, selección #${i + 1}.`
            );
            return;
          }
          if (product.Colores?.length > 0 && !color) {
            setWarningMessage(
              `Debe seleccionar un color para el producto ${
                product.NombreProducto
              }, selección #${i + 1}.`
            );
            return;
          }

          const cartItem = {
            id: product.ProductoID,
            name: product.NombreProducto,
            price: product.Precio,
            quantity: 1,
            ItemTypeID: 1,
            sizeId: size,
            colorId: color,
          };

          bundle.productos.push(cartItem);
        }
      }

      cartItems.push(bundle);
    } else if (selectedType === "product") {
      if (!selectedSize) {
        setWarningMessage("Debe seleccionar una talla para el producto.");
        return;
      }
      if (!selectedColor) {
        setWarningMessage("Debe seleccionar un color para el producto.");
        return;
      }

      const cartItem = {
        id: selectedProduct.ProductoID,
        name: selectedProduct.NombreProducto,
        price: selectedProduct.Precio,
        quantity: quantity,
        ItemTypeID: 1,
        sizeId: selectedSize,
        colorId: selectedColor,
      };

      cartItems.push(cartItem);
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.concat(cartItems);
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(`Added to cart: ${quantity} items`);
    handleClose();
  };

  // Define setSelectedIdAndType
  const setSelectedIdAndType = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((item) => (
        <ProductCard
          key={item.ProductoID}
          item={item}
          onClick={setSelectedIdAndType}
        />
      ))}

      {bundles.map((item) => (
        <BundleCard
          key={item.BundleID}
          item={item}
          onClick={setSelectedIdAndType}
        />
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

                {selectedType === "bundle" &&
                  selectedBundle?.Productos?.length > 0 && (
                    <BundleProducts
                      selectedBundle={selectedBundle}
                      selectedSizes={selectedSizes}
                      selectedColors={selectedColors}
                      setSelectedSizes={setSelectedSizes}
                      setSelectedColors={setSelectedColors}
                    />
                  )}

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
import BundleProducts from "./Bundle/BundleProducts";
import ProductCard from "./Cards/ProductCard";
import BundleCard from "./Cards/BundleCard";

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
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

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
    const cartItems = [];

    if (selectedType === "bundle" && selectedBundle?.Productos?.length > 0) {
      if (!selectedColor) {
        setWarningMessage("Debe seleccionar un color para el bundle.");
        return;
      }

      const bundle = {
        id: selectedBundle.BundleID,
        name: selectedBundle.NombreBundle,
        price: selectedBundle.PrecioTotalBundle,
        quantity: quantity,
        ItemTypeID: 2,
        colorId: selectedColor,
        productos: [],
      };

      for (const product of selectedBundle.Productos) {
        for (let i = 0; i < product.Cantidad; i++) {
          const size = selectedSizes[product.ProductoID]?.[i] || null;
          const color = selectedColors[product.ProductoID]?.[i] || null;

          if (product.Tallas?.length > 0 && !size) {
            setWarningMessage(
              `Debe seleccionar una talla para el producto ${
                product.NombreProducto
              }, selección #${i + 1}.`
            );
            return;
          }
          if (product.Colores?.length > 0 && !color) {
            setWarningMessage(
              `Debe seleccionar un color para el producto ${
                product.NombreProducto
              }, selección #${i + 1}.`
            );
            return;
          }

          const cartItem = {
            id: product.ProductoID,
            name: product.NombreProducto,
            price: product.Precio,
            quantity: 1,
            ItemTypeID: 1,
            sizeId: size || null,
            colorId: color,
          };

          bundle.productos.push(cartItem);
        }
      }

      cartItems.push(bundle);
    } else if (selectedType === "product") {
      if (selectedProduct?.Tallas?.length > 0 && !selectedSize) {
        setWarningMessage("Debe seleccionar una talla para el producto.");
        return;
      }
      if (!selectedColor) {
        setWarningMessage("Debe seleccionar un color para el producto.");
        return;
      }

      const cartItem = {
        id: selectedProduct.ProductoID,
        name: selectedProduct.NombreProducto,
        price: selectedProduct.Precio,
        quantity: quantity,
        ItemTypeID: 1,
        sizeId: selectedSize || null,
        colorId: selectedColor,
      };

      cartItems.push(cartItem);
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.concat(cartItems);
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(`Added to cart: ${quantity} items`);
    handleClose();
  };

  // Define setSelectedIdAndType
  const setSelectedIdAndType = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((item) => (
        <ProductCard
          key={item.ProductoID}
          item={item}
          onClick={setSelectedIdAndType}
        />
      ))}

      {bundles.map((item) => (
        <BundleCard
          key={item.BundleID}
          item={item}
          onClick={setSelectedIdAndType}
        />
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
                      : ""}
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

                {selectedType === "bundle" &&
                  selectedBundle?.Productos?.length > 0 && (
                    <BundleProducts
                      selectedBundle={selectedBundle}
                      selectedSizes={selectedSizes}
                      selectedColors={selectedColors}
                      setSelectedSizes={setSelectedSizes}
                      setSelectedColors={setSelectedColors}
                    />
                  )}

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
