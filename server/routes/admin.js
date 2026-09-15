import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth.js";
import { db } from "../db.js";

const router = Router();

// POST /api/admin/verify - checks the token is valid (used by the login form)
router.post("/verify", requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

// GET /api/admin/tables - admin only, table inventory
router.get("/tables", requireAdmin, (_req, res) => {
  res.json(db.getTables());
});

export default router;
