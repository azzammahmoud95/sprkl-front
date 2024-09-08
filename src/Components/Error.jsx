import React, { Children } from "react";

export default function Error({ children }) {
    return (
        <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
        >
            {children}
        </div>
    );
}
