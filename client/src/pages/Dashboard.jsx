import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Statistics
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  // Handle Form Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add / Update Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/tasks/${editId}`, formData);
        alert("Task Updated Successfully");
      } else {
        await API.post("/tasks", formData);
        alert("Task Added Successfully");
      }

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });

      setEditId(null);

      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  // Edit Task
  const handleEdit = (task) => {
    setEditId(task._id);

    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        My Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-5 text-center">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-3xl font-bold mt-2">{totalTasks}</p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-5 text-center">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-3xl font-bold mt-2">{pendingTasks}</p>
        </div>

        <div className="bg-orange-500 text-white rounded-xl shadow-lg p-5 text-center">
          <h2 className="text-lg font-semibold">In Progress</h2>
          <p className="text-3xl font-bold mt-2">{inProgressTasks}</p>
        </div>

        <div className="bg-green-600 text-white rounded-xl shadow-lg p-5 text-center">
          <h2 className="text-lg font-semibold">Completed</h2>
          <p className="text-3xl font-bold mt-2">{completedTasks}</p>
        </div>

      </div>

      {/* Task Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 mb-10"
      >
        <h2 className="text-2xl font-semibold mb-5 text-blue-700">
          {editId ? "Edit Task" : "Add New Task"}
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {editId ? "Update Task" : "Add Task"}
          </button>

        </div>
      </form>

      {/* Task List */}

      {tasks.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Tasks Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first task using the form above.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-700">
                {task.title}
              </h2>

              <p className="text-gray-700 mt-3">
                {task.description}
              </p>

              <div className="mt-4">

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-semibold ${
                    task.status === "Completed"
                      ? "bg-green-600"
                      : task.status === "In Progress"
                      ? "bg-orange-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {task.status}
                </span>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Dashboard;