const Task = require("../models/taskModel");

const todoRender = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.sub }).sort({ createdAt: -1 }).lean();
    return res.render("pages/todo", { judul: "Tasks", tasks, error: null, query: req.query });
  } catch (error) { return next(error); }
};

const createTask = async (req, res, next) => {
  try {
    const title = (req.body.title || "").trim();
    const priorities = ["low", "medium", "high"];
    const categories = ["personal", "work", "ideas"];
    if (!title || title.length > 200 || !priorities.includes(req.body.priority) || !categories.includes(req.body.category)) return res.redirect("/todo?error=invalid-task");
    await Task.create({ userId: req.user.sub, title, priority: req.body.priority, category: req.body.category });
    return res.redirect("/todo");
  } catch (error) { return next(error); }
};

const toggleTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.sub });
    if (!task) return res.redirect("/todo");
    task.isCompleted = !task.isCompleted;
    task.status = task.isCompleted ? "Done" : "To Do";
    await task.save();
    return res.redirect("/todo");
  } catch (error) { return next(error); }
};

const deleteTask = async (req, res, next) => {
  try { await Task.deleteOne({ _id: req.params.id, userId: req.user.sub }); return res.redirect("/todo"); }
  catch (error) { return next(error); }
};

const clearCompleted = async (req, res, next) => {
  try { await Task.deleteMany({ userId: req.user.sub, isCompleted: true }); return res.redirect("/todo"); }
  catch (error) { return next(error); }
};

module.exports = { todoRender, createTask, toggleTask, deleteTask, clearCompleted };
