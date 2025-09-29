import React, { useState, useEffect } from "react";
import { TimetableItem } from "../../types/TimetableItem.d";

const AdminTimetableData: React.FC = () => {
  const [timetable, setTimetable] = useState<TimetableItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<TimetableItem, "id">>({
    day: 1,
    start_time: "",
    end_time: "",
    band_name: "",
    song1: "",
    song2: "",
    song3: "",
  });
  const [editingItem, setEditingItem] = useState<TimetableItem | null>(null);

  const API_URL = "http://127.0.0.1:8000/timetable";

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        console.error("Failed to fetch timetable:", response.statusText);
        return;
      }
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "day" ? parseInt(value, 10) || 1 : value;

    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: updatedValue });
    } else {
      setNewItem({ ...newItem, [name]: updatedValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemToSubmit = editingItem ? { ...editingItem } : { ...newItem };
    const url = editingItem ? `${API_URL}/${editingItem.id}` : API_URL;
    const method = editingItem ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToSubmit),
      });
      if (response.ok) {
        fetchTimetable();
        setNewItem({
          day: 1,
          start_time: "",
          end_time: "",
          band_name: "",
          song1: "",
          song2: "",
          song3: "",
        });
        setEditingItem(null);
      } else {
        console.error("Failed to save item");
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleEdit = (item: TimetableItem) => {
    setEditingItem(item);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchTimetable();
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
    setNewItem({
      day: 1,
      start_time: "",
      end_time: "",
      band_name: "",
      song1: "",
      song2: "",
      song3: "",
    });
  };

  const formItem = editingItem || newItem;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Data Management</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-gray-700 p-6 rounded-lg mb-6"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editingItem ? "Edit Item" : "Add New Item"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="day"
            value={formItem.day}
            onChange={handleInputChange}
            placeholder="Day (1 or 2)"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
            required
          />
          <input
            name="start_time"
            value={formItem.start_time}
            onChange={handleInputChange}
            placeholder="Start Time (HH:MM)"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
            required
          />
          <input
            name="end_time"
            value={formItem.end_time}
            onChange={handleInputChange}
            placeholder="End Time (HH:MM)"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
            required
          />
          <input
            name="band_name"
            value={formItem.band_name}
            onChange={handleInputChange}
            placeholder="Band Name"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
            required
          />
          <input
            name="song1"
            value={formItem.song1 || ""}
            onChange={handleInputChange}
            placeholder="Song 1"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
          />
          <input
            name="song2"
            value={formItem.song2 || ""}
            onChange={handleInputChange}
            placeholder="Song 2"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
          />
          <input
            name="song3"
            value={formItem.song3 || ""}
            onChange={handleInputChange}
            placeholder="Song 3"
            className="bg-gray-900 text-white border border-gray-700 rounded p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-button_bg text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editingItem ? "Update" : "Add"}
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

      <h2 className="text-2xl font-bold mb-4">Timetable</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Day
            </th>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Time
            </th>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Band
            </th>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Songs
            </th>
            <th className="bg-gray-800 border border-gray-700 p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-700 p-3">{item.day}</td>
              <td className="border border-gray-700 p-3">
                {item.start_time} - {item.end_time}
              </td>
              <td className="border border-gray-700 p-3">{item.band_name}</td>
              <td className="border border-gray-700 p-3">
                {item.song1 && <div>1: {item.song1}</div>}
                {item.song2 && <div>2: {item.song2}</div>}
                {item.song3 && <div>3: {item.song3}</div>}
              </td>
              <td className="border border-gray-700 p-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id!)}
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

export default AdminTimetableData;
