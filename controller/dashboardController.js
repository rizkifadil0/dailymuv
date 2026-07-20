const dashboardRender = (req, res) => {
  res.render("pages/dashboard", {
    judul: "Dashboard",
  });
};

module.exports = { dashboardRender };
