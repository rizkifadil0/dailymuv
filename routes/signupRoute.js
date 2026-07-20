const express = require("express");
const router = express.Router();
const signupCont = require("../controller/loginUpController");
const { validateSignup } = require("../middleware/auth");

router.get("/", signupCont.signupRender);
router.post("/", validateSignup, signupCont.signup);

module.exports = router;
