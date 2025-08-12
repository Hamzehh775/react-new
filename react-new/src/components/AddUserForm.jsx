import React, { useState } from "react";

const AddUserForm = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    addUser({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
