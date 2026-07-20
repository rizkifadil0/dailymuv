const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true, default: Date.now },
    mood: { type: String, enum: ["happy", "reflective", "productive", "tired", "stressed"], required: [true, "Pilihan mood hari ini wajib diisi"] },
    title: { type: String, required: [true, "Judul jurnal wajib diisi"], trim: true, default: "Untitled Entry" },
    content: { type: String, required: [true, "Isi jurnal wajib diisi"] },
  },
  { timestamps: true },
);

journalSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model("Journal", journalSchema);
