const express = require("express");
const cors = require("cors");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
