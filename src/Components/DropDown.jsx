import React from "react";

export default function DropDown({
    id,
    options,
    value,
    onChange,
    disabled = false,
    width = "w-full",
    className = "",
}) {
    return (
        <select
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 ${width} p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
