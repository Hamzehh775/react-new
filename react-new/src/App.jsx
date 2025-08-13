import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  // Add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setNewUser({ name: "", email: "" });
        fetchUsers();
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Add post
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        setNewPost({ title: "", content: "" });
        fetchPosts();
      }
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  // Delete post
  const handleDeletePost = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
      });
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="p-6 space-y-8">

      {}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <form className="mb-4 flex gap-2" onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 flex-1"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 flex-1"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Posts Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <form className="mb-4 flex gap-2" onSubmit={handleAddPost}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 flex-1"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Content"
            className="border p-2 flex-1"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </form>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="p-2 border">{post.id}</td>
                <td className="p-2 border">{post.title}</td>
                <td className="p-2 border">{post.content}</td>
                <td className="p-2 border">
                  {new Date(post.created_at).toLocaleString()}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}