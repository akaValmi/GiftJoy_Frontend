import React from "react";

const Resume = ({ subtotal, isv, total }) => {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between border-b pb-2 mb-4">
        <span className="text-lg font-medium">Subtotal:</span>
        <span className="text-lg font-semibold">L. {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-b pb-2 mb-4">
        <span className="text-lg font-medium">ISV (15%):</span>
        <span className="text-lg font-semibold">L. {isv.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-lg font-medium">Total (sin envío):</span>
        <span className="text-xl font-bold text-blue-600">
          L. {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Resume;
