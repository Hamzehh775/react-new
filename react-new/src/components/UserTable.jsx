export default function UserTable({ users, deleteUser }) {
  return (
    <table className="min-w-full border-collapse border rounded-lg shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">ID</th>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Email</th>
          <th className="border px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{u.id}</td>
            <td className="border px-4 py-2">{u.name}</td>
            <td className="border px-4 py-2">{u.email}</td>
            <td className="border px-4 py-2 text-center">
              <button
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr><td className="border px-4 py-3 text-center" colSpan={4}>No users</td></tr>
        )}
      </tbody>
    </table>
  );
}
