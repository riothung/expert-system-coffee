const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");

const router = require("./routes/index");

const app = express();

const PORT = 3000;

dotenv.config();
app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    // origin: "*",
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"]
  })
);

app.use(express.static(path.join(__dirname, "../frontend")));

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

app.get("/api/check-token", (req, res) => {
  console.log()
  res.json({ cookies: req.cookies })
})

app.get("/api/read-cookies", (req, res) => {
  const myCookie = req.cookies.myCookie
  if(myCookie){
    res.send(`Cookie's value: ${myCookie}`)
  }else{
    res.send(`No cookie found!`)
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
