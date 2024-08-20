import React from "react";

const Warning = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-red-500 font-bold">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Warning;
