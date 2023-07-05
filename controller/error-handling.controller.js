exports.handle404 = (req, res) => {
  res.status(404).send({ msg: "Error 404 - Not Found" });
};
