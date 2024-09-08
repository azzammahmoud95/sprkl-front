import React from 'react';


const Row = ({ children }) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-600 border-b dark:border-gray-700">
      {children}
    </tr>
  );
};

export default Row;
