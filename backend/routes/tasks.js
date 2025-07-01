const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const verifyToken = require("../middleware/verifyToken");

// ✅ POST /api/tasks → Create a new task
router.post("/", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = new Task({ text, user: req.user.id });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Task creation failed" });
  }
});

// ✅ GET /api/tasks → Get all tasks of the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// ✅ PUT /api/tasks/:id → Update task text or completion
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Task update failed" });
  }
});

// ✅ DELETE /api/tasks/:id → Delete a task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Task deletion failed" });
  }
});
// ✅ PUT /api/tasks/toggle/:id → Toggle task completed status
router.put("/toggle/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Error toggling task:", err);
    res.status(500).json({ message: "Task toggle failed" });
  }
});


module.exports = router;
