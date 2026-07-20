const lpRender = (req, res) => {
  res.render("pages/landingPage", {
    judul: "DailyMuf",
  });
};

module.exports = { lpRender };
