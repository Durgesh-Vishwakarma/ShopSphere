import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const PORT = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// ✅ CORS should come first — BEFORE other middleware
app.use(
  cors({
    origin: "https://shop-sphere-kohl.vercel.app/", // Frontend URL on Vercel
    credentials: true, // Allow cookies and headers
  })
);

// ✅ Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie parser middleware
app.use(cookieParser());

// ✅ API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ PayPal config route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// ✅ Serve uploaded files statically
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

// ✅ Custom error handlers
app.use(notFound);
app.use(errorHandler);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
