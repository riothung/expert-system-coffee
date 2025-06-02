const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const router = require("./routes/index");

const app = express();

// app.use = express.static()

const PORT = 3000;

dotenv.config();
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "*",
    // origin: "http://127.0.0.1:5500",
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
