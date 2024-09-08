import React from "react";


export default function Input({
    placeholder,
    name,
    id,
    type = "text",
    width = "w-full",
    disabled = false,
    onChange,
    onClick,
    onBlur,
    required = false,
    value,
}) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            name={name}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 ${width} p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
            disabled={disabled}
            onChange={onChange}
            onClick={onClick}
            onBlur={onBlur}
            required={required}
            value={value}
        />
    );
}
