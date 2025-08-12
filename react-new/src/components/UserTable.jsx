export default function UserTable({ users, deleteUser }) {
  return (
    <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                onClick={() => deleteUser(index)}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
