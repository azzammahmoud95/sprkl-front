import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
    
  const {
    users,

  } = useSelector((store) => store.usersReducer);
    return (
        <footer className="bg-gray-800 text-white text-center p-4">
            <p className="text-sm">Number of users: {users.length}</p>
        </footer>
    );
}
