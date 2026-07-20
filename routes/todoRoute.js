const express = require("express");
const router = express.Router();
const todoCont = require("../controller/todoController");
const { requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, todoCont.todoRender);
router.post("/", requireAuth, todoCont.createTask);
router.post("/:id/toggle", requireAuth, todoCont.toggleTask);
router.post("/:id/delete", requireAuth, todoCont.deleteTask);
router.post("/clear-completed", requireAuth, todoCont.clearCompleted);

module.exports = router;
