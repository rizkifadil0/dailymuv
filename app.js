//Library
const express = require("express");
const app = express();
const { connectDB } = require("./config/connect");

//.env
require("dotenv").config();
const port = process.env.PORT || 3000;

//Route Library
const LandingPageRoute = require("./routes/lpRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const todoRoute = require("./routes/todoRoute");
const journalRoute = require("./routes/journalRoute");
const loginRoute = require("./routes/loginRoute");
const singupRoute = require("./routes/signupRoute");
const weatherRoute = require("./routes/weatherRoute");
const logoutRoute = require("./routes/logoutRoute");

//Middleware
const notFound404 = require("./middleware/404");
const { attachAuthenticatedUser } = require("./middleware/auth");

//Layout Ejs express
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(attachAuthenticatedUser);
app.set("view engine", "ejs");
app.set("layout", "main");
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

connectDB(); // connect mongodb

//Routes
app.use("/", LandingPageRoute);
app.use("/dashboard", dashboardRoute);
app.use("/todo", todoRoute);
app.use("/login", loginRoute);
app.use("/singup", singupRoute);
app.use("/signup", singupRoute);
app.use("/journal", journalRoute);
app.use("/weather", weatherRoute);
app.use("/logout", logoutRoute);

app.use(notFound404.notFound); //404 middleware

//listen
app.listen(port, () => {
  console.log(`Running on http://127.0.0.1:${port}`);
});
