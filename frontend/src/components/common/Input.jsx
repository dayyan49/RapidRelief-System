import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-slate-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          px-4
          py-3
          rounded-lg
          bg-slate-800
          text-white
          border
          ${error ? "border-red-500" : "border-slate-700"}
          focus:outline-none
          focus:ring-2
          focus:ring-teal-500
          focus:border-transparent
          placeholder:text-slate-500
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
          ${className}
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;