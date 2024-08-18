/*"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products"; // Ajusta la ruta de importación según tu estructura de proyecto

export default function ProductCards() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // Añadido para distinguir entre productos y bundles
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        console.log("Data obtenida del endpoint:", data); // Imprime la data en la consola
        setProducts(data.productos);
        setBundles(data.bundles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const selectedProduct = products.find(
    (item) => item.ProductoID === selectedId
  );
  const selectedBundle = bundles.find((item) => item.BundleID === selectedId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        <motion.div
          key={item.ProductoID}
          layoutId={`product-${item.ProductoID}`} // Cambiado para distinguir productos
          onClick={() => {
            setSelectedId(item.ProductoID);
            setSelectedType("product"); // Establece el tipo seleccionado
          }}
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.ImagenProducto}`}
            alt={item.NombreProducto}
            className="h-32 w-full object-cover rounded-md"
          />
          <motion.h5 className="mt-2 text-gray-500">
            {item.NombreProducto}
          </motion.h5>
          <motion.h2 className="text-lg font-bold">
            ${item.PrecioProducto.toFixed(2)}
          </motion.h2>
        </motion.div>
      ))}

      {bundles.map((item) => (
        <motion.div
          key={item.BundleID}
          layoutId={`bundle-${item.BundleID}`} // Cambiado para distinguir bundles
          onClick={() => {
            setSelectedId(item.BundleID);
            setSelectedType("bundle"); // Establece el tipo seleccionado
          }}
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.ImagenProducto}`} // Asumiendo que bundles también tienen imágenes
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
              <img
                src={`/images/${
                  (selectedType === "product"
                    ? selectedProduct
                    : selectedBundle
                  )?.ImagenProducto
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
                      ? selectedProduct?.PrecioProducto
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
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-1 w-16 text-center"
                  />
                  <motion.button
                    className="ml-4 p-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => console.log("Añadir al carrito")}
                  >
                    Añadir al carrito
                  </motion.button>
                </div>
              </div>

              <motion.button
                onClick={() => {
                  setSelectedId(null);
                  setSelectedType(null); // Resetea el tipo seleccionado
                }}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
              >
                Cerrar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



*/

/* VERSION 2




"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products"; // Ajusta la ruta de importación según tu estructura de proyecto

export default function ProductCards({ filters }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // Añadido para distinguir entre productos y bundles
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts(filters); // Pasar los filtros a la solicitud
        console.log("Data obtenida del endpoint:", data); // Imprime la data en la consola
        setProducts(data.productos || []);
        setBundles(data.bundles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]); // Dependencia en filtros

  const selectedProduct = products.find(
    (item) => item.ProductoID === selectedId
  );
  const selectedBundle = bundles.find((item) => item.BundleID === selectedId);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((item) => (
        <motion.div
          key={item.ProductoID}
          layoutId={`product-${item.ProductoID}`} // Cambiado para distinguir productos
          onClick={() => {
            setSelectedId(item.ProductoID);
            setSelectedType("product"); // Establece el tipo seleccionado
          }}
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.ImagenProducto}`} // Ajusta el nombre de la propiedad de imagen si es necesario
            alt={item.NombreProducto}
            className="h-32 w-full object-cover rounded-md"
          />
          <motion.h5 className="mt-2 text-gray-500">
            {item.NombreProducto}
          </motion.h5>
          <motion.h2 className="text-lg font-bold">
            ${item.Precio.toFixed(2)}{" "}
          </motion.h2>
        </motion.div>
      ))}

      {bundles.map((item) => (
        <motion.div
          key={item.BundleID}
          layoutId={`bundle-${item.BundleID}`} // Cambiado para distinguir bundles
          onClick={() => {
            setSelectedId(item.BundleID);
            setSelectedType("bundle"); // Establece el tipo seleccionado
          }}
          className="p-4 border rounded-lg cursor-pointer bg-white"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={`/images/${item.ImagenProducto}`} // Asegúrate de que bundles también tengan imágenes
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
              <img
                src={`/images/${
                  (selectedType === "product"
                    ? selectedProduct
                    : selectedBundle
                  )?.ImagenProducto
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
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-1 w-16 text-center"
                  />
                  <motion.button
                    className="ml-4 p-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => console.log("Añadir al carrito")}
                  >
                    Añadir al carrito
                  </motion.button>
                </div>
              </div>

              <motion.button
                onClick={() => {
                  setSelectedId(null);
                  setSelectedType(null); // Resetea el tipo seleccionado
                }}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
              >
                Cerrar
              </motion.button>
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
        const data = await getProducts(filters);
        console.log("Data obtenida del endpoint:", data);
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
                  onClick={() => {
                    // Aquí puedes agregar la lógica para añadir al carrito
                    console.log(
                      `Añadir ${quantity} de ${
                        selectedType === "product"
                          ? selectedProduct?.NombreProducto
                          : selectedBundle?.NombreBundle
                      } al carrito.`
                    );
                    setSelectedId(null);
                    setSelectedType(null);
                  }}
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
