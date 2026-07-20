const express = require("express");
const router = express.Router();
const dashCont = require("../controller/dashboardController");
const { requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, dashCont.dashboardRender);

module.exports = router;
