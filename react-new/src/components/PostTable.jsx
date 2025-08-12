export default function PostTable({ posts, setPosts }) {
  const handleDelete = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Title</th>
          <th className="py-2 px-4 border-b">Author</th>
          <th className="py-2 px-4 border-b">Image</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border-b">{post.title}</td>
            <td className="py-2 px-4 border-b">{post.author}</td>
            <td className="py-2 px-4 border-b">
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
            </td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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
