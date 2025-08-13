export default function PostTable({ posts, deletePost }) {
  return (
    <table className="min-w-full border-collapse border rounded-lg shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">Title</th>
          <th className="border px-4 py-2 text-left">Author</th>
          <th className="border px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{p.title}</td>
            <td className="border px-4 py-2">{p.author}</td>
            <td className="border px-4 py-2 text-center">
              <button
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => deletePost(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {posts.length === 0 && (
          <tr><td className="border px-4 py-3 text-center" colSpan={3}>No posts</td></tr>
        )}
      </tbody>
    </table>
  );
}
