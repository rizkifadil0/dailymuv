const express = require("express");
const router = express.Router();
const journalCont = require("../controller/journalController");
const { requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, journalCont.journalRender);
router.post("/", requireAuth, journalCont.createJournal);
router.post("/:id/delete", requireAuth, journalCont.deleteJournal);

module.exports = router;
