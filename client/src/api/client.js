async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

export async function getAvailability(date, partySize) {
  const params = new URLSearchParams({ date, partySize });
  const res = await fetch(`/api/availability?${params}`);
  return handle(res);
}

export async function createReservation(payload) {
  const res = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function verifyAdminToken(token) {
  const res = await fetch("/api/admin/verify", {
    method: "POST",
    headers: { "x-admin-token": token },
  });
  return handle(res);
}

export async function getReservations(token, date) {
  const params = date ? `?date=${date}` : "";
  const res = await fetch(`/api/reservations${params}`, {
    headers: { "x-admin-token": token },
  });
  return handle(res);
}

export async function sendContactMessage(payload) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function getMessages(token) {
  const res = await fetch("/api/contact", {
    headers: { "x-admin-token": token },
  });
  return handle(res);
}

export async function updateReservationStatus(token, id, status) {
  const res = await fetch(`/api/reservations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": token,
    },
    body: JSON.stringify({ status }),
  });
  return handle(res);
}
