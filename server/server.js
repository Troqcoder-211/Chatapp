const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const auth_routes = require("./routes/auth_routes");
const message_routes = require("./routes/message_routes");
const user_routes = require("./routes/user_routes");

const connectToMongoDB = require("./db/connectToMongoDB");

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); // to parse JSON request bodies
app.use(cookieParser());

app.use("/api/auth", auth_routes);
app.use(`/api/messages`, message_routes);
app.use(`/api/users`, user_routes);

// app.get("/", (req, res) => {
//   // http:localhost:5000/api/auth
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
