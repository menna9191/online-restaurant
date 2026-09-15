export function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"];

  if (!process.env.ADMIN_TOKEN) {
    return res
      .status(500)
      .json({ error: "Server misconfigured: ADMIN_TOKEN is not set." });
  }

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Invalid admin token." });
  }

  next();
}
