const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const auth_routes = require("./routes/auth_routes");
const message_routes = require("./routes/message_routes");
const user_routes = require("./routes/user_routes");

const connectToMongoDB = require("./db/connectToMongoDB");

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); // to parse JSON request bodies
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(`/api/auth`, auth_routes);
app.use(`/api/messages`, message_routes);
app.use(`/api/users`, user_routes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
