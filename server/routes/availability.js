import { Router } from "express";
import { db } from "../db.js";
import { getAvailableSlots } from "../utils/availability.js";

const router = Router();

// GET /api/availability?date=2026-09-20&partySize=4
router.get("/", (req, res) => {
  const { date, partySize } = req.query;
  const size = Number(partySize);

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "A valid date (YYYY-MM-DD) is required." });
  }
  if (!size || size < 1) {
    return res.status(400).json({ error: "A valid partySize is required." });
  }

  const today = new Date().toISOString().slice(0, 10);
  if (date < today) {
    return res.status(400).json({ error: "Date must be today or later." });
  }

  const slots = getAvailableSlots({
    date,
    partySize: size,
    tables: db.getTables(),
    reservations: db.getReservations(),
  });

  res.json({ date, partySize: size, slots });
});

export default router;
