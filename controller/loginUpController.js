const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const scrypt = promisify(crypto.scrypt);
const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  return `${salt}:${(await scrypt(password, salt, 64)).toString("hex")}`;
};
const verifyPassword = async (password, savedPassword) => {
  const [salt, savedKey] = (savedPassword || "").split(":");
  if (!salt || !savedKey) return false;
  const candidate = await scrypt(password, salt, 64);
  const stored = Buffer.from(savedKey, "hex");
  return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
};
const renderAuthError = (res, page, judul, error, formData, status) =>
  res.status(status).render(page, { judul, error, formData });

const loginRender = (req, res) => {
  res.render("pages/login", {
    judul: "Login",
    error: null,
    formData: {},
    query: req.query,
  });
};

const signupRender = (req, res) => {
  res.render("pages/signup", {
    judul: "Signup",
    error: null,
    formData: {},
  });
};

const signup = async (req, res, next) => {
  try {
    if (await User.exists({ email: req.body.email })) return renderAuthError(res, "pages/signup", "Signup", "Email tersebut sudah terdaftar. Silakan login.", { name: req.body.name, email: req.body.email }, 409);
    await User.create({ name: req.body.name, email: req.body.email, password: await hashPassword(req.body.password) });
    return res.redirect("/login?registered=1");
  } catch (error) {
    if (error.code === 11000) return renderAuthError(res, "pages/signup", "Signup", "Email tersebut sudah terdaftar. Silakan login.", { name: req.body.name, email: req.body.email }, 409);
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await verifyPassword(req.body.password, user.password))) return renderAuthError(res, "pages/login", "Login", "Email atau password salah.", { email: req.body.email }, 401);
    if (!process.env.JWT_SECRET) return next(new Error("JWT_SECRET belum dikonfigurasi."));
    const remember = req.body.remember === "on";
    const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: remember ? "30d" : "1d" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: remember ? 2592000000 : 86400000 });
    return res.redirect("/dashboard");
  } catch (error) {
    return next(error);
  }
};

module.exports = { loginRender, signupRender, signup, login };
