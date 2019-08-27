require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes");
app.use("/api", routes);

app.listen(3000, () => console.log("Server listening on port 3000"));
