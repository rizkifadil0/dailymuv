const notFound = (req, res, next) => {
  res.status(404).render("pages/404", {
    judul: "404 Halaman Tidak Ditemukan",
  });
};

module.exports = { notFound };
