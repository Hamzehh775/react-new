import React, { useState } from "react";
import "./index.css";
import UserTable from "./components/UserTable";
import AddUserForm from "./components/AddUserForm";
import PostTable from "./components/PostTable";
import AddPostForm from "./components/AddPostForm";

export default function App() {
  const deleteUser = (index) => {
  setUsers(users.filter((_, i) => i !== index));
};

const deletePost = (index) => {
  setPosts(posts.filter((_, i) => i !== index));
};

  const [users, setUsers] = useState([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [posts, setPosts] = useState([
    { title: "Welcome to the Dashboard", author: "John Doe" },
    { title: "Tailwind is Awesome", author: "Jane Smith" },
  ]);
  
  
  const addUser = (user) => setUsers([...users, user]);
  const addPost = (post) => setPosts([...posts, post]);

  return (
    
    <div className="min-h-screen bg-red-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add User</h2>
          <AddUserForm addUser={addUser} />
          <UserTable users={users} deleteUser={deleteUser}/>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add Post</h2>
          <AddPostForm addPost={addPost} />
          <PostTable posts={posts} setPosts={setPosts}/>
        </div>
      </div>
    </div>
  );
}
