import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import availabilityRouter from "./routes/availability.js";
import reservationsRouter from "./routes/reservations.js";
import adminRouter from "./routes/admin.js";
import contactRouter from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/availability", availabilityRouter);
app.use("/api/reservations", reservationsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

// Central error handler - catches anything thrown or passed to next(err)
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on the server.",
  });
});

app.listen(PORT, () => {
  console.log(`TableReserve server running on http://localhost:${PORT}`);
});
