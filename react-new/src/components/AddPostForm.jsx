import { useState } from "react";

export default function AddPostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !image) return;

    addPost({ title, author, image });
    setTitle("");
    setAuthor("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full"
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Post
      </button>
    </form>
  );
}
