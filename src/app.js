const config = require("./config/index");
const compression = require("compression");
const mongooseConnection = require("./services/servicesUsingMongoose/database/mongoose");
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const routes = require("./api/v1/controllers/index");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(compression({ filter: shouldCompress }));

app.use("/api/v1/", routes);

mongooseConnection(config);

app.listen(process.env.PORT || 3333, (err, sucess) => {
  if (err) {
    console.log("Error " + err);
  }
  console.log(`Server ir running ${sucess}`);
});

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    return false;
  }
  return compression.filter(req, res);
}
