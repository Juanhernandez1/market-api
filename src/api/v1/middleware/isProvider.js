let isProvider = (req, res, next) => {
  let user = req.user;
  if (user.role !== "provider") {
    return res.status(403).json({
      success: false,
      message: "No tienes acceso a este recurso."
    });
  }
  next();
};

module.exports = isProvider;
