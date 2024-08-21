/*import React from "react";

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
*/

// Warning.jsx
import React from "react";

const Warning = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-red-600">Warning</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
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
        </div>
        <p className="mt-2 text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Warning;
