// components/FormComponents.js
import React from "react";

export const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    {children}
  </label>
);

export const Select = ({ id, value, onChange, options }) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-md bg-white focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out px-4 py-2"
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const Input = ({ type, id, value, onChange }) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-md bg-white focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 transition-all duration-300 ease-in-out px-4 py-2"
  />
);
