const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: [true, "Nama tugas wajib diisi"], trim: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    category: { type: String, enum: ["personal", "work", "ideas"], default: "work" },
    status: { type: String, enum: ["To Do", "In Progress", "Done", "Failed"], default: "To Do" },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

taskSchema.index({ userId: 1 });

module.exports = mongoose.model("Task", taskSchema);
