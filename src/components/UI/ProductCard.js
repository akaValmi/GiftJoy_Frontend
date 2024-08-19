/*
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products";

export default function ProductCards({ filters }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
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
  }, [filters]); // Escucha los cambios en filters

  const selectedProduct = products.find(
    (item) => item.ProductoID === selectedId
  );
  const selectedBundle = bundles.find((item) => item.BundleID === selectedId);

  const handleClose = () => {
    setSelectedId(null);
    setSelectedType(null);
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
        type: selectedType,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log(`Añadido al carrito: ${quantity} de ${cartItem.name}`);
      setSelectedId(null);
      setSelectedType(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        <motion.div
          key={item.ProductoID}
          layoutId={`product-${item.ProductoID}`}
          onClick={() => {
            setSelectedId(item.ProductoID);
            setSelectedType("product");
          }}
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.Img}`}
            alt={item.NombreProducto}
            className="h-32 w-full object-cover rounded-md"
          />
          <motion.h5 className="mt-2 text-gray-500">
            {item.NombreProducto}
          </motion.h5>
          <motion.h2 className="text-lg font-bold">
            ${item.Precio.toFixed(2)}
          </motion.h2>
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
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.Img}`}
            alt={item.NombreBundle}
            className="h-32 w-full object-cover rounded-md"
          />
          <motion.h5 className="mt-2 text-gray-500">
            {item.NombreBundle}
          </motion.h5>
          <motion.h2 className="text-lg font-bold">
            ${item.PrecioTotalBundle.toFixed(2)}
          </motion.h2>
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
                aria-label="Cerrar"
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
                src={`/images/${
                  (selectedType === "product"
                    ? selectedProduct
                    : selectedBundle
                  )?.Img
                }`}
                alt={
                  (selectedType === "product"
                    ? selectedProduct?.NombreProducto
                    : selectedBundle?.NombreBundle) || "Producto o Bundle"
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
                    $
                    {(selectedType === "product"
                      ? selectedProduct?.Precio
                      : selectedBundle?.PrecioTotalBundle || 0
                    ).toFixed(2)}
                  </motion.h3>
                  <motion.p className="mt-4 text-gray-600">
                    {selectedType === "bundle"
                      ? selectedBundle?.DescripcionBundle
                      : "Descripción no disponible."}
                  </motion.p>
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
                  onClick={addToCart} // Cambiado aquí
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

export default function ProductCards({ filters }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
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
        type: selectedType,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log(`Añadido al carrito: ${quantity} de ${cartItem.name}`);
      setSelectedId(null);
      setSelectedType(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        <motion.div
          key={item.ProductoID}
          layoutId={`product-${item.ProductoID}`}
          onClick={() => {
            setSelectedId(item.ProductoID);
            setSelectedType("product");
          }}
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.Img}`}
            alt={item.NombreProducto}
            className="h-32 w-full object-cover rounded-md"
          />
          <motion.h5 className="mt-2 text-gray-500">
            {item.NombreProducto}
          </motion.h5>
          <motion.h2 className="text-lg font-bold">
            ${item.Precio.toFixed(2)}
          </motion.h2>
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
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.Img}`}
            alt={item.NombreBundle}
            className="h-32 w-full object-cover rounded-md"
          />
          <motion.h5 className="mt-2 text-gray-500">
            {item.NombreBundle}
          </motion.h5>
          <motion.h2 className="text-lg font-bold">
            ${item.PrecioTotalBundle.toFixed(2)}
          </motion.h2>
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
                aria-label="Cerrar"
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
                src={`/images/${
                  (selectedType === "product"
                    ? selectedProduct
                    : selectedBundle
                  )?.Img
                }`}
                alt={
                  (selectedType === "product"
                    ? selectedProduct?.NombreProducto
                    : selectedBundle?.NombreBundle) || "Producto o Bundle"
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
                    $
                    {(selectedType === "product"
                      ? selectedProduct?.Precio
                      : selectedBundle?.PrecioTotalBundle || 0
                    ).toFixed(2)}
                  </motion.h3>
                  <motion.p className="mt-4 text-gray-600">
                    {selectedType === "bundle"
                      ? selectedBundle?.DescripcionBundle
                      : "Descripción no disponible."}
                  </motion.p>
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
