const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

