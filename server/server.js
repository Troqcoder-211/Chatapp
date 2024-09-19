const express = require("express");
const dotenv = require("dotenv");

const auth_routes = require("./routes/auth_routes");
const connectToMongoDB = require("./db/connectToMongoDB");

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); // to parse JSON request bodies

app.use("/api/auth", auth_routes);

// app.get("/", (req, res) => {
//   // http:localhost:5000/api/auth
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
