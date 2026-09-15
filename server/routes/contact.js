import { Router } from "express";
import { randomUUID } from "crypto";
import { db } from "../db.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact - public
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const entry = {
    id: randomUUID().slice(0, 8),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  db.addMessage(entry);
  res.status(201).json({ ok: true });
});

// GET /api/contact - admin only
router.get("/", requireAdmin, (_req, res) => {
  const messages = [...db.getMessages()].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(messages);
});

export default router;
