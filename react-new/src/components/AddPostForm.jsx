import { useState } from "react";

export default function AddPostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    addPost({ title, author });
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">Post Title</label>
        <input className="w-full border rounded px-3 py-2" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm mb-1">Author</label>
        <input className="w-full border rounded px-3 py-2" value={author} onChange={(e)=>setAuthor(e.target.value)} />
      </div>
      {/* Image upload will be wired later */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Post</button>
    </form>
  );
}
