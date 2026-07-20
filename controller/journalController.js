const Journal = require("../models/journalModel");

const journalRender = async (req, res, next) => {
  try {
    const entries = await Journal.find({ userId: req.user.sub }).sort({ date: -1, createdAt: -1 }).lean();
    return res.render("pages/journal", { judul: "Journal", entries, error: null, query: req.query });
  } catch (error) { return next(error); }
};

const createJournal = async (req, res, next) => {
  try {
    const moods = ["happy", "reflective", "productive", "tired", "stressed"];
    const content = (req.body.content || "").trim();
    const title = (req.body.title || "Untitled Entry").trim();
    const date = new Date(req.body.date);
    if (!content || content.length > 10000 || !moods.includes(req.body.mood) || Number.isNaN(date.getTime())) return res.redirect("/journal?error=invalid-entry");
    await Journal.create({ userId: req.user.sub, date, mood: req.body.mood, title: title || "Untitled Entry", content });
    return res.redirect("/journal");
  } catch (error) { return next(error); }
};

const deleteJournal = async (req, res, next) => {
  try { await Journal.deleteOne({ _id: req.params.id, userId: req.user.sub }); return res.redirect("/journal"); }
  catch (error) { return next(error); }
};

module.exports = { journalRender, createJournal, deleteJournal };
