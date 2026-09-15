import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "data", "store.json");

const SEED = {
  tables: [
    { id: "T1", name: "Table 1", capacity: 2 },
    { id: "T2", name: "Table 2", capacity: 2 },
    { id: "T3", name: "Table 3", capacity: 2 },
    { id: "T4", name: "Table 4", capacity: 2 },
    { id: "T5", name: "Table 5", capacity: 4 },
    { id: "T6", name: "Table 6", capacity: 4 },
    { id: "T7", name: "Table 7", capacity: 4 },
    { id: "T8", name: "Table 8", capacity: 4 },
    { id: "T9", name: "Table 9", capacity: 6 },
    { id: "T10", name: "Table 10", capacity: 6 },
    { id: "T11", name: "Table 11", capacity: 8 },
  ],
  reservations: [],
  messages: [],
};

function load() {
  if (!existsSync(DB_PATH)) {
    writeFileSync(DB_PATH, JSON.stringify(SEED, null, 2));
    return structuredClone(SEED);
  }
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function save(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

let cache = load();

export const db = {
  getTables() {
    return cache.tables;
  },
  getReservations() {
    return cache.reservations;
  },
  addReservation(reservation) {
    cache.reservations.push(reservation);
    save(cache);
    return reservation;
  },
  updateReservation(id, updates) {
    const res = cache.reservations.find((r) => r.id === id);
    if (!res) return null;
    Object.assign(res, updates);
    save(cache);
    return res;
  },
  findReservation(id) {
    return cache.reservations.find((r) => r.id === id) || null;
  },
  getMessages() {
    return cache.messages || [];
  },
  addMessage(message) {
    if (!cache.messages) cache.messages = [];
    cache.messages.push(message);
    save(cache);
    return message;
  },
};
