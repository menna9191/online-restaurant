export const OPEN_TIME = "17:00"; // 5:00 PM
export const LAST_SEATING = "21:30"; // last reservation slot
export const SLOT_MINUTES = 30;
export const RESERVATION_DURATION = 90; // minutes a table is held

export function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(mins) {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function generateSlotTimes() {
  const slots = [];
  for (
    let t = timeToMinutes(OPEN_TIME);
    t <= timeToMinutes(LAST_SEATING);
    t += SLOT_MINUTES
  ) {
    slots.push(minutesToTime(t));
  }
  return slots;
}

function overlaps(startA, durationA, startB, durationB) {
  const endA = startA + durationA;
  const endB = startB + durationB;
  return startA < endB && startB < endA;
}

/**
 * Finds the smallest table that fits partySize and has no conflicting
 * reservation at the given date/time. Returns the table object or null.
 */
export function findAvailableTable({
  date,
  time,
  partySize,
  tables,
  reservations,
  excludeReservationId = null,
}) {
  const windowStart = timeToMinutes(time);

  const candidates = tables
    .filter((t) => t.capacity >= partySize)
    .sort((a, b) => a.capacity - b.capacity);

  for (const table of candidates) {
    const conflict = reservations.some((r) => {
      if (r.id === excludeReservationId) return false;
      if (r.status === "cancelled") return false;
      if (r.date !== date || r.tableId !== table.id) return false;
      return overlaps(
        windowStart,
        RESERVATION_DURATION,
        timeToMinutes(r.time),
        RESERVATION_DURATION
      );
    });

    if (!conflict) return table;
  }

  return null;
}

/**
 * Returns the list of time strings on `date` that have at least one
 * available table for `partySize`.
 */
export function getAvailableSlots({ date, partySize, tables, reservations }) {
  return generateSlotTimes().filter((time) =>
    findAvailableTable({ date, time, partySize, tables, reservations })
  );
}
