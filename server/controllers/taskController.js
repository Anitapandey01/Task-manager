const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    // Create Task
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Find task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update task
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    // Find task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete task
    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};