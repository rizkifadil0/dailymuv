const jwt = require("jsonwebtoken");
const validator = require("validator");

const renderValidationError = (res, page, judul, error, formData = {}) =>
  res.status(422).render(page, { judul, error, formData });

const validateSignup = (req, res, next) => {
  const { name, email, password, confirmPassword, terms } = req.body;
  const formData = { name: (name || "").trim(), email: (email || "").trim() };

  if (!validator.isLength(formData.name, { min: 2, max: 100 })) return renderValidationError(res, "pages/signup", "Signup", "Nama harus terdiri dari 2 sampai 100 karakter.", formData);
  if (!validator.isEmail(formData.email)) return renderValidationError(res, "pages/signup", "Signup", "Masukkan alamat email yang valid.", formData);
  if (!validator.isLength(password || "", { min: 8, max: 128 })) return renderValidationError(res, "pages/signup", "Signup", "Password harus terdiri dari 8 sampai 128 karakter.", formData);
  if (password !== confirmPassword) return renderValidationError(res, "pages/signup", "Signup", "Konfirmasi password tidak sama.", formData);
  if (!terms) return renderValidationError(res, "pages/signup", "Signup", "Anda harus menyetujui syarat dan ketentuan.", formData);

  req.body.name = formData.name;
  req.body.email = validator.normalizeEmail(formData.email);
  return next();
};

const validateLogin = (req, res, next) => {
  const email = (req.body.email || "").trim();
  const formData = { email };
  if (!validator.isEmail(email) || !validator.isLength(req.body.password || "", { min: 1, max: 128 })) return renderValidationError(res, "pages/login", "Login", "Email atau password tidak valid.", formData);
  req.body.email = validator.normalizeEmail(email);
  return next();
};

const requireAuth = (req, res, next) => {
  const cookie = (req.headers.cookie || "").split(";").map((value) => value.trim()).find((value) => value.startsWith("token="));
  const token = cookie ? decodeURIComponent(cookie.slice(6)) : null;
  if (!token || !process.env.JWT_SECRET) return res.redirect("/login");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (_error) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

const attachAuthenticatedUser = (req, res, next) => {
  res.locals.isAuthenticated = false;
  res.locals.currentUser = null;
  const cookie = (req.headers.cookie || "").split(";").map((value) => value.trim()).find((value) => value.startsWith("token="));
  const token = cookie ? decodeURIComponent(cookie.slice(6)) : null;
  if (!token || !process.env.JWT_SECRET) return next();
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.isAuthenticated = true;
    res.locals.currentUser = user;
  } catch (_error) {
    res.clearCookie("token");
  }
  return next();
};

module.exports = { validateSignup, validateLogin, requireAuth, attachAuthenticatedUser };
