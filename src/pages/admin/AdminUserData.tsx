import React, { useState, useEffect } from "react";
import { User } from "../../types/User.d";
import { useAuth } from "../../auth/AuthContext";

interface NewUser extends User {
  password?: string;
}

const AdminUserData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newItem, setNewItem] = useState<NewUser>({
    username: "",
    password: "",
  });
  const [editingItem, setEditingItem] = useState<User | null>(null);
  const { token } = useAuth();

  const API_URL = "http://127.0.0.1:8000/users";

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL, { headers: getAuthHeaders() });
      if (!response.ok) {
        console.error("Failed to fetch users:", response.statusText);
        return;
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (editingItem) {
        setNewItem({ ...newItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSubmit = editingItem ? { username: editingItem.username, password: newItem.password } : { ...newItem };
    const url = editingItem ? `${API_URL}/${editingItem.username}` : API_URL;
    const method = editingItem ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(itemToSubmit),
      });
      if (response.ok) {
        fetchUsers();
        setNewItem({ username: "", password: "" });
        setEditingItem(null);
      } else {
        console.error("Failed to save item");
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleEdit = (item: User) => {
    setEditingItem(item);
    setNewItem({ username: item.username, password: "" });
  };

  const handleDelete = async (username: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${API_URL}/${username}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
        if (response.ok) {
          fetchUsers();
        } else {
          console.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItem({ username: "", password: "" });
  };

  const formItem = editingItem ? {username: editingItem.username, password: newItem.password} : newItem;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Data Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-gray-700 p-6 rounded-lg mb-6"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editingItem ? "Edit User" : "Add New User"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            value={formItem.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
            required
            disabled={!!editingItem}
          />
          <input
            type="password"
            name="password"
            value={formItem.password || ''}
            onChange={handleInputChange}
            placeholder="Password"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
            required={!editingItem}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-button_bg text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editingItem ? "Update Password" : "Add User"}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Username
            </th>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td className="border border-gray-700 p-3">{user.username}</td>
              <td className="border border-gray-700 p-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.username)}
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserData;
