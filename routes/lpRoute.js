const express = require("express");
const router = express.Router();
const lpCont = require("../controller/lpController");

router.get("/", lpCont.lpRender);

module.exports = router;
