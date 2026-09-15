import { Router } from "express";
import { randomUUID } from "crypto";
import { db } from "../db.js";
import { findAvailableTable } from "../utils/availability.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/reservations - public booking
router.post("/", (req, res) => {
  const { date, time, partySize, name, email, phone, notes } = req.body;
  const size = Number(partySize);

  if (!date || !time || !size || !name || !email) {
    return res.status(400).json({
      error: "date, time, partySize, name, and email are required.",
    });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const table = findAvailableTable({
    date,
    time,
    partySize: size,
    tables: db.getTables(),
    reservations: db.getReservations(),
  });

  if (!table) {
    return res.status(409).json({
      error: "That time slot just filled up. Please pick another time.",
    });
  }

  const reservation = {
    id: randomUUID().slice(0, 8).toUpperCase(),
    date,
    time,
    partySize: size,
    tableId: table.id,
    tableName: table.name,
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || "",
    notes: notes?.trim() || "",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  db.addReservation(reservation);
  res.status(201).json(reservation);
});

// GET /api/reservations?date=2026-09-20 - admin only
router.get("/", requireAdmin, (req, res) => {
  const { date } = req.query;
  let reservations = db.getReservations();

  if (date) {
    reservations = reservations.filter((r) => r.date === date);
  }

  reservations = [...reservations].sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)
  );

  res.json(reservations);
});

// PATCH /api/reservations/:id - admin only (update status)
router.patch("/:id", requireAdmin, (req, res) => {
  const { status } = req.body;
  const validStatuses = ["confirmed", "seated", "completed", "cancelled", "no-show"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` });
  }

  const updated = db.updateReservation(req.params.id, { status });
  if (!updated) {
    return res.status(404).json({ error: "Reservation not found." });
  }

  res.json(updated);
});

export default router;
