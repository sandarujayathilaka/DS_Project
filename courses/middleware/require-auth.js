const requireAuth = (allowedRoles) => (req, res, next) => {
  if (!req.currentUser || !allowedRoles.includes(req.currentUser.role)) {
    res.status(401).json({ error: "Not Authorized" });
  }

  next();
};

module.exports = { requireAuth };
