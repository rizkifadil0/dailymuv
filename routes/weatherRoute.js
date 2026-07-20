const express = require("express");
const router = express.Router();
const weatherCont = require("../controller/weatherController");
const { requireAuth } = require("../middleware/auth");

router.get("/", requireAuth, weatherCont.weatherRender);
router.post("/", requireAuth, weatherCont.getWeather);

module.exports = router;
