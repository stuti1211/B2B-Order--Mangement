import express from "express";
import { pool } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("B2B Backend is working");
});
pool.query("SELECT NOW()")
  .then(() => console.log("PostgreSQL connected"))
  .catch((error) => console.log(error));

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

