import { motion } from "framer-motion";

const BundleCard = ({ item, onClick }) => (
  <motion.div
    key={item.BundleID}
    layoutId={`bundle-${item.BundleID}`}
    onClick={() => onClick(item.BundleID, "bundle")}
    className="border rounded-lg cursor-pointer bg-white flex flex-col"
    style={{ width: "250px", height: "400px" }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="w-full h-2/3 overflow-hidden">
      <img
        src={item?.Colores[0]?.ImgColor || "https://via.placeholder.com/150"}
        alt={item.NombreBundle}
        className="w-full h-full object-cover"
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
);

export default BundleCard;
