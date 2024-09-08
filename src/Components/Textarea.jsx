import React from "react";

export default function Textarea({
    id,
    placeholder = "Write here...",
    value,
    onChange,
    disabled = false,
    rows = 4,
    className = "",
}) {
    return (
        <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
            className={`block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        ></textarea>
    );
}
