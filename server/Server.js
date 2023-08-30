const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");

const routes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected...");
} catch (error) {
  console.log(error);
}

app.use("/api", routes);

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
