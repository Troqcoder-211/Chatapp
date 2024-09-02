const express = require("express");
const dotenv = require("dotenv");
const auth_routes = require("./routes/auth_routes");
const connectToMongoDB = require("./db/connectToMongoDB");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", auth_routes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
