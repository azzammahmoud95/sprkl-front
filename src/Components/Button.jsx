import React from "react";


export default function Button({
    children,
    loading,
    onClick,
    style,
    disabled,
    type,
    form,
    name,
}) {
    return (
        <button 
            form={form}
            name={name}
            style={style}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onClick}
            disabled={disabled || loading}
            type={type}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
