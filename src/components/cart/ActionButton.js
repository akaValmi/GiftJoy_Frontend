import React from "react";

const ActionButton = ({ onClick, disabled, children }) => {
  return (
    !disabled && (
      <button
        onClick={onClick}
        disabled={disabled}
        className="text-red-500 hover:text-red-700"
      >
        {children}
      </button>
    )
  );
};

export default ActionButton;
