# Aurelio — Restaurant Website & Reservation System

A full restaurant site: home page, menu, location/hours with a map, a
contact form, and a live table-reservation system — plus a staff dashboard
to manage bookings and messages.

**Stack:** React (Vite) + React Router · Node.js/Express · JSON-file storage
(no database server, no external API keys, no native modules — runs
anywhere `npm install` works).

## Pages

- **Home** (`/`) — hero, highlights, reservation CTA
- **Menu** (`/menu`) — categorized dishes with prices
- **Location** (`/location`) — address, hours, embedded map
- **Contact** (`/contact`) — contact form (saved server-side, viewable by staff)
- **Reserve** (`/reserve`) — date/party size → live time slots → booking → confirmation
- **Admin** (`/admin`) — staff login, then tabs for Reservations and Messages

## Project structure

```
table-reserve/
├── client/               React frontend (Vite)
│   └── src/
│       ├── api/client.js         fetch wrapper for all backend calls
│       ├── components/Layout.jsx nav + footer shell used by every page
│       ├── data/restaurant.js    restaurant name, menu, hours, address — edit this
│       └── pages/
│           ├── Home.jsx
│           ├── Menu.jsx
│           ├── Location.jsx
│           ├── Contact.jsx
│           ├── BookingPage.jsx / DetailsForm.jsx / ConfirmationPage.jsx
│           └── AdminLogin.jsx / AdminDashboard.jsx
└── server/               Express backend
    ├── db.js                    JSON-file "database" (auto-seeds tables)
    ├── utils/availability.js    slot-finding / conflict logic
    ├── middleware/adminAuth.js  shared-token auth for staff routes
    └── routes/
        ├── availability.js      GET  /api/availability
        ├── reservations.js      POST /api/reservations, GET/PATCH (admin)
        ├── contact.js           POST /api/contact, GET (admin)
        └── admin.js             POST /api/admin/verify, GET /api/admin/tables
```

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# open .env and set ADMIN_TOKEN to any password you want for /admin
npm run dev
```

Runs on `http://localhost:5001`. No API keys, no database install required.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173` and proxies `/api` requests to the backend.

## Making it your own restaurant

Almost everything content-wise lives in one file:
`client/src/data/restaurant.js` — name, tagline, address, phone, email,
hours, and the full menu. Edit that and the Home/Menu/Location/Contact/Footer
all update automatically.

The map on `/location` uses a keyless Google Maps embed built from the
address in that file, so it updates automatically too.

## How the reservation system works

- 11 tables are seeded with capacities from 2 to 8 guests.
- Service hours are 5:00 PM–9:30 PM (last seating), 30-minute slots, each
  reservation holds its table for 90 minutes.
- `GET /api/availability` checks every slot in service hours and returns
  only times where at least one table of sufficient capacity is free.
- `POST /api/reservations` re-checks availability server-side (so two
  people can't double-book the same slot) and assigns the smallest table
  that fits.
- Admin routes require an `x-admin-token` header matching `ADMIN_TOKEN` —
  a deliberately simple auth model for a portfolio project; swap in real
  sessions/JWT before using this for an actual business.

## Ideas for extending this

- Real database (Postgres/SQLite) instead of the JSON file
- Email confirmation on booking and on contact form submission
- Photo gallery / press page
- Table-map view in the admin dashboard
- Multi-location support

## Deploying

- **Frontend:** Vercel or Netlify (`client/` as the root, `npm run build`)
- **Backend:** Render or Railway (`server/` as the root, set `ADMIN_TOKEN`
  as an environment variable). The JSON-file store resets if the host's
  filesystem isn't persistent — fine for a demo, swap to a real DB before
  relying on it for production data.
