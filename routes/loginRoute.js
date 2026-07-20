const express = require("express");
const router = express.Router();
const loginCont = require("../controller/loginUpController");
const { validateLogin } = require("../middleware/auth");

router.get("/", loginCont.loginRender);
router.post("/", validateLogin, loginCont.login);

module.exports = router;
